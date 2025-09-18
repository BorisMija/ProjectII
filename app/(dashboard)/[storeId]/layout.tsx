import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ storeId: string }>; // ✅ Schimbă aici — params e Promise!
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const { storeId } = await params; // ✅ AȘTEAPTĂ params aici

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId, // ✅ Acum e corect — folosește storeId, nu params.storeId
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}