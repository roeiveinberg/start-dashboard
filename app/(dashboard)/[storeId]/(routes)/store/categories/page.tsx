
import { format } from "date-fns"
import prismadb from "@/lib/prismadb";


import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";

const CategoriesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            herosection: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        herosectionLabel: item.herosection.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }))

    return (
        <div className="flex-1 space-y-6 p-14 pt-12">
            <div>
                <CategoryClient data={formattedCategories} />
            </div>
            <div>

            </div>
        </div>
    );
}

export default CategoriesPage;