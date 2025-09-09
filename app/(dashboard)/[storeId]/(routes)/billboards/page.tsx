import {format} from "date-fns";
import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./components/client";
import {BillboardColumn } from "./components/columns"
interface BillboardsPageProps {
  params: {
    storeId: string;
  };
}

const BillboardsPage = async ({ params }: BillboardsPageProps) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
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

const formattedBillboards: FormattedBillboard[] = billboards.map((item: { id: string; label: string; createdAt: Date }) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, YYYY")


}));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={billboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;