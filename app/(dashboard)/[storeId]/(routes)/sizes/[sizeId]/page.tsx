import prismadb from "@/lib/prismadb";
import {SizeForm} from 
interface BillboardPageProps {
  params: {
    sizeId: string;
  };
}

const SizePage = async ({ params }: BillboardPageProps) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6">
        <>
        </>
      </div>
    </div>
  );
};

export default SizePage;