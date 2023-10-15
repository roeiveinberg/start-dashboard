import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";

interface DashboardPageProps {
    params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {

    const totalRevenue = await getTotalRevenue(params.storeId);
    const salesCount = await getSalesCount(params.storeId)
    const stockCount = await getStockCount(params.storeId)
    const graphRevenue = await getGraphRevenue(params.storeId)

    const store = await prismadb.start_Store.findFirst({
        where: {
            id: params.storeId
        }
    })

    return (
        <div className="flex-1 space-y-6 p-14 pt-12">
            <Heading
                title="overview"
                description="overview of your store"
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
            <Card className=" col-span-4">
                <CardContent className="pl-2 pb-2 pt-12">
                    <Overview data={graphRevenue} />
                </CardContent>
            </Card>
        </div>
    );
}

export default DashboardPage;