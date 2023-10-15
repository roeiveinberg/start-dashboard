import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
    params
}: {
    params: { categoryId: string, storeId: string }
}) => {

    const category = await prismadb.category.findUnique({
        where: {
            id: params.categoryId
        }
    });
    const herosections = await prismadb.hero_section.findMany({
        where: {
            storeId: params.storeId
        }
    });

    return (
        <>
            <div className="flex-col">
                <div className="flex-1 space-y-4">
                    <CategoryForm initialData={category} herosections={herosections} />
                </div>

            </div>
        </>
    );
}

export default CategoryPage;