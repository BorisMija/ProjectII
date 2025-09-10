import prismadb from "@/lib/prismadb";
import {CategoryForm} from "./components/category-form";
interface BillboardPageProps {
  params: {
    categoryId: string;
    storeId: string
  };
}

const CategoryPage = async ({ params }: BillboardPageProps) => {
  const billboard = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6">
        <CategoryForm 
        billboards={billboards}
        initialData={category} />
        
      </div>
    </div>
  );
};

export default CategoryPage;