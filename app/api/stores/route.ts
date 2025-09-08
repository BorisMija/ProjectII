import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb"; // Asigură-te că calea este corectă

export async function POST(req: Request) {
  try {
    const { userId } = await auth(); // await the async function to get userId

    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new Response("Name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new Response("Internal error", { status: 500 });
  }
}