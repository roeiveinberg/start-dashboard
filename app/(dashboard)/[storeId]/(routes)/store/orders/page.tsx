import { format } from "date-fns"

import prismadb from "@/lib/prismadb";

import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { Item } from "@radix-ui/react-dropdown-menu";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formmattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-1 space-y-6 p-14 pt-12">
            <div>
                <OrderClient data={formmattedOrders} />
            </div>
        </div>
    );
}

export default OrdersPage;