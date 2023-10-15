import { getProductsCost } from "@/actions/get-product-cost";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";

interface AnalyticsPageProps {
    params: { storeId: string }
}


const AnalyticsPageManager = async ({
    params
}: AnalyticsPageProps) => {


    const totalRevenue = await getTotalRevenue(params.storeId);
    const salesCount = await getSalesCount(params.storeId)
    const stockCount = await getStockCount(params.storeId)


    return (
        <div className="flex-1 space-y-6 p-14 pt-12">
            <Heading
                title="analytics"
                description="analytics information of your business"
            />

            <div className="grid gap-4 grid-cols-3">

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="pl-4 pb-4">
                        <div className="text-xl font-bold">
                            {formatter.format(totalRevenue)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                        <CardTitle className="text-sm font-medium">
                            Sales
                        </CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="pl-4 pb-4">
                        <div className="text-xl font-bold">
                            +{salesCount}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                        <CardTitle className="text-sm font-medium">
                            Products In Stock
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="pl-4 pb-4">
                        <div className="text-xl font-bold">
                            {stockCount}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default AnalyticsPageManager;