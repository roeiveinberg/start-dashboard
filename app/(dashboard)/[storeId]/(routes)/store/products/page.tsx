
import { format } from "date-fns"
import prismadb from "@/lib/prismadb";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import { ProductClient } from "./components/client";

const ProductsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true,
            tags: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        price: formatter.format(item.price.toNumber()),
        productCost: item.productCost.toNumber(),
        description: item.description,
        mainImage: item.mainImage,
        quantity: item.quantity,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        Weight: item.Weight,
        height: item.height,
        width: item.width,
        Length: item.Length,
        category: item.category.name,
        tags: item.tags.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }))

    return (
        <div className="flex-1 space-y-6 p-14 pt-12">
            <div>
                <ProductClient data={formattedProducts} />
            </div>

        </div>
    );
}

export default ProductsPage;