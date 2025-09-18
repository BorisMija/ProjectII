import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";

interface BillboardsPageProps {
  params: Promise<{ storeId: string }>; // ✅ Schimbare 1: params e Promise
}

const BillboardsPage = async ({ params }: BillboardsPageProps) => {
  const { storeId } = await params; // ✅ Schimbare 2: Așteaptă params

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId, // ✅ Schimbare 3: Folosește storeId, nu params.storeId
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  interface FormattedBillboard {
    id: string;
    label: string;
    createdAt: string;
  }

  const formattedBillboards: FormattedBillboard[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"), // ✅ "yyyy" mic, nu "YYYY"
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} /> {/* ✅ Schimbare 4: Folosește formattedBillboards */}
      </div>
    </div>
  );
};

export default BillboardsPage;