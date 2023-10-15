"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { CellAction } from "./cell-action"


export type CategoryColumn = {
    id: string
    name: string
    herosectionLabel: string
    createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
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
        accessorKey: "name",
        header: "name",
    },
    {
        accessorKey: "herosection",
        header: "hero-section",
        cell: ({ row }) => row.original.herosectionLabel
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
