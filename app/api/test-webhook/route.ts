import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    // Get all orders to see what's in the database
    const orders = await prismadb.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      message: "Webhook test endpoint",
      totalOrders: orders.length,
      unpaidOrders: orders.filter(order => !order.isPaid).length,
      paidOrders: orders.filter(order => order.isPaid).length,
      recentOrders: orders.slice(0, 5).map(order => ({
        id: order.id,
        storeId: order.storeId,
        isPaid: order.isPaid,
        createdAt: order.createdAt,
        orderItemsCount: order.orderItems.length,
      })),
    });
  } catch (error) {
    console.error('Test webhook error:', error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

