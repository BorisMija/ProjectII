import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import Stripe from "stripe";


export async function POST(req: Request){
    console.log("🔔 Webhook received!");
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;
    console.log("📝 Signature:", signature ? "Present" : "Missing");
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body, 
            signature, 
            process.env.STRIPE_WEBHOOK_SECRET!
        );

    } catch (error: any) {
        console.error("❌ Webhook signature verification failed:", error.message);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;
    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country,
    ].filter(Boolean);
    const addressString = addressComponents.filter((c) => c !== null).join(', ');
    console.log("🎯 Event type:", event.type);
    if (event.type === "checkout.session.completed") {
        console.log("✅ Checkout session completed!");
        console.log("📋 Session metadata:", session?.metadata);
        // Validate that we have an order ID
        if (!session?.metadata?.orderId) {
            console.error("❌ No order ID found in session metadata");
            return new NextResponse("No order ID found", { status: 400 });
        }

        try {
            console.log("🔄 Updating order:", session.metadata.orderId);
            const order = await prismadb.order.update({
                where: {
                    id: session.metadata.orderId,
                },
                data: {
                    isPaid: true,
                    address: addressString,
                    phone: session?.customer_details?.phone || '',
                },
                include: {
                    orderItems: true,
                },
            });
            console.log("✅ Order updated successfully:", order.id);

            // Archive the products
            const productIds = order.orderItems.map((orderItem) => orderItem.productId);
            await prismadb.product.updateMany({
                where: {
                    id: { in: productIds },
                },
                data: {
                    isArchived: true,
                },
            });

        } catch (error) {
            console.error("❌ Failed to update order:", error);
            return new NextResponse("Failed to update order", { status: 500 });
        }
    }
    return new NextResponse(null, { status: 200 });

    
}