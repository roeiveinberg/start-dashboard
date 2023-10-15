import prismadb from "@/lib/prismadb"


export const getProductsCost = async (storeId: string) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId,
        },
    });

    let totalCost = 0

    products.forEach((product) => {
        totalCost += product.productCost.toNumber()
    })

    return totalCost

}