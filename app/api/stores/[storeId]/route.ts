import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
      const { userId } =auth();
      const body = await req.json();
      const { name } = body;


      if (!userId) {
      return new NextResponse("Unauthorzed", {status: 401}); // await the async function to get userId
    }
   
    if (!params.storeId) {
      return new NextResponse("Store ID is required", {status: 400});
    }

    const store = await prismadb.store.deleteMany({
        where: {
            id: params.storeId,
            userId,
        },
        data: {
            name,
        },
    });
    return NextResponse.json(store);
}
    catch (error) {
        console.log("[STORE_DELETE]", error);
        return new Response("Internal error", { status: 500 });
    }
}