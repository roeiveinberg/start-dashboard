"use client"


import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { OrderColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface OrderClientProps {
    data: OrderColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {

    return (
        <>
            <Heading
                title="Orders"
                description="Manage Orders for your store"
            />
            <DataTable searchKey="products" columns={columns} data={data} />
        </>
    )
}