import prismadb from "@/lib/prismadb"


export const getProductsQuantity = async (storeId: string) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId,
        },
    });

    let totalQuantity = 0

    products.forEach((product) => {
        totalQuantity += product.quantity
    })

    return totalQuantity

}