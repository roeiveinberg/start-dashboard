"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { CellAction } from "./cell-action"


export type ProductColumn = {
    id: string
    name: string
    price: string
    size: string
    category: string
    tags: string
    mainImage: string
    isArchived: boolean
    createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "mainImg",
        header: "image",
        cell: ({ row }) => (
            <div className="flex items-center">
                <img className="w-[40px] h-[60px] object-cover" src={row.original.mainImage} alt="mainImage" />
            </div>
        )
    },
    {
        accessorKey: "name",
        header: "name",
    },
    {
        accessorKey: "isArchived",
        header: "status",
        cell: ({ row }) => (
            <div className="flex items-center">
                {
                    row.original.isArchived ?
                        <p
                            className="bg-[#ffa4a4] px-3 py-1"
                        >archived</p>
                        :
                        <p
                            className="bg-[#DBFED8] px-3 py-1"
                        >Active</p>
                }

            </div>
        )

    },
    {
        accessorKey: "price",
        header: "price",
    },
    {
        accessorKey: "quantity",
        header: "quantity",
    },
    {
        accessorKey: "category",
        header: "category",
    },
    {
        accessorKey: "tags",
        header: "tags",
    },
    {
        accessorKey: "createdAt",
        header: "date",
    },
    {
        id: "Actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
]
