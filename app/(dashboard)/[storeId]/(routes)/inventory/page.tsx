import { getProducts } from "@/actions/get-products";
import { getProductsQuantity } from "@/actions/get-products-quantity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Package } from "lucide-react";

interface InventoryProps {
    params: { storeId: string }
}

const InventoryPage = async ({
    params
}: InventoryProps) => {

    const totalProductsQuantity = await getProductsQuantity(params.storeId)
    const products = await getProducts(params.storeId)

    return (
        <>
            <div className="flex-col space-y-12 p-14 pt-12">
                <Heading
                    title="inventory"
                    description="manage your inventory"
                />
                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                            <CardTitle className="text-sm font-medium">
                                total Products In Stock
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="pl-4 pb-4">
                            <div className="text-xl font-semibold">
                                {totalProductsQuantity}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Separator />

                <div>
                    <h2 className=" text-[22px] font-semibold mb-6">
                        product quantity
                    </h2>
                    <div className="grid grid-cols-2 2xl:grid-cols-4 md:grid-cols-3 gap-4">
                        {products.map((product) => (
                            <>
                                <Card className="">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-2 p-4">
                                        <CardTitle className="text-sm font-medium">
                                            {product.name}
                                        </CardTitle>
                                        <Package className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-between space-y-1 pl-4 pr-4 pb-2">
                                        <div className="text-[18px] font-semibold">
                                            {product.quantity}
                                        </div>
                                        <div>
                                            <img src={product.mainImage} alt="" className=" w-4" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default InventoryPage;