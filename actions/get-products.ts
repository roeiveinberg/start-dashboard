import prismadb from "@/lib/prismadb"


export const getProducts = async (storeId: string) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId,
        },

    });

    return products
}