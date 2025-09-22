import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ productId: string; storeId: string }> },
) {
  try {
    const { productId } = await params;
    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    // find and update store by id

    const product = await prismadb.product.findUnique({
      where: {
        id: productId,
      },

      include: {
        // include the relations to get the full data of the product
        category: true,
        color: true,
        size: true,
        images: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      storeId: string;
      productId: string;
    }>;
  },
) {
  try {
    const { userId } = await auth();
    const { storeId, productId } = await params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color Id  is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size Id is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!images || images.length === 0) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }


    // General query to update the product
    await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });
    const product = await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.log(`[PRODUCT_PATCH] `, error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ storeId: string; productId: string }> },
) {
  try {
    const { userId } = await auth();
    const { storeId, productId } = await params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is Required", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("Product ID is Required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // find and update store

    const product = await prismadb.product.deleteMany({
      where: {
        id: productId,
      },
    });
    return NextResponse.json(product);
  } catch (error: any) {
    console.log(`[PRODUCT_DELETE] `, error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
