"use client"

import { useParams, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import Link from "next/link"

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {

    const pathname = usePathname()
    const params = useParams()

    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'overview',
            active: pathname === `/${params.storeId}`
        },
        {
            href: `/${params.storeId}/analytics`,
            label: 'analytics',
            active: pathname === `/${params.storeId}/analytics`
        },
        {
            href: `/${params.storeId}/store`,
            label: 'store',
            active: pathname === `/${params.storeId}/store`
        },
        {
            href: `/${params.storeId}/website`,
            label: 'website',
            active: pathname === `/${params.storeId}/website`
        },
        {
            href: `/${params.storeId}/inventory`,
            label: 'inventory',
            active: pathname === `/${params.storeId}/inventory`
        },
        {
            href: `/${params.storeId}/employees`,
            label: 'employees',
            active: pathname === `/${params.storeId}/employees`
        },
        {
            href: `/${params.storeId}/crm`,
            label: 'cRM',
            active: pathname === `/${params.storeId}/crm`
        },
        {
            href: `/${params.storeId}/marketing`,
            label: 'marketing',
            active: pathname === `/${params.storeId}/marketing`
        },
        {
            href: `/${params.storeId}/courses`,
            label: 'courses',
            active: pathname === `/${params.storeId}/courses`
        },
        {
            href: `/${params.storeId}/tasks-management`,
            label: 'tasks management',
            active: pathname === `/${params.storeId}/tasks-management`
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`
        },
    ]

    return (
        <nav className={cn("flex flex-col space-y-[2vh] pb-14", className)}>
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-[17px] font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-black"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
};