import {format} from "date-fns";
import prismadb from "@/lib/prismadb";
import  {SizesClient}  from "./components/client";
import {SizeColumn} from "./components/columns"
interface SizesPageProps {
  params: {
    storeId: string;
  };
}

const SizesPage = async ({ params }: SizesPageProps) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
interface FormattedSizes {
    id: string;
    name: string;
    createdAt: string;

}

const formattedSizes: SizeColumn[] = sizes.map((item: { id: string; label: string; createdAt: Date }) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, YYYY")


}));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;