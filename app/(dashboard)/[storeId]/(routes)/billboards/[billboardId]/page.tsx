import prismadb from "@/lib/prismadb";

interface BillboardPageProps {
  params: {
    billboardId: string;
    storeId: string;
  };
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6">
        <
        
      </div>
      
    </div>
  );
};

export default BillboardPage;