"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { CellAction } from "./cell-action"


export type HeroSectionColumn = {
    id: string
    label: string
    createdAt: string
    imageUrl: string
}

export const columns: ColumnDef<HeroSectionColumn>[] = [
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
        accessorKey: "label",
        header: "label",
    },
    {
        accessorKey: "createdAt",
        header: "date",
    },
    {
        accessorKey: "imageUrl",
        header: "image",
        cell: ({ row }) => (
            <div className="flex items-center">
                <img className="w-20 h-12 object-cover" src={row.original.imageUrl} alt="" />
            </div>

        )
    },
    {
        id: "Actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
]
