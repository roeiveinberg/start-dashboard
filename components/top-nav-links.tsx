"use client"

import { useParams, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { motion } from "framer-motion"


const two = {
    hidden: {
        opacity: 0,
        x: -10,
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.3,
            duration: 0.6
        },
    },
}


export function Topnav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {


    const pathname = usePathname()
    const params = useParams()


    const storeRoutes = [
        {
            href: `/${params.storeId}/store/products`,
            label: 'products',
            active: pathname === `/${params.storeId}/store/products`
        },
        {
            href: `/${params.storeId}/store/categories`,
            label: 'categories',
            active: pathname === `/${params.storeId}/store/categories`
        },
        {
            href: `/${params.storeId}/store/collections`,
            label: 'collections',
            active: pathname === `/${params.storeId}/store/collections`
        },
        {
            href: `/${params.storeId}/store/tags`,
            label: 'tags',
            active: pathname === `/${params.storeId}/store/tags`
        },
        {
            href: `/${params.storeId}/store/attributes`,
            label: 'attributes',
            active: pathname === `/${params.storeId}/store/attributes`
        },
        {
            href: `/${params.storeId}/store/orders`,
            label: 'orders',
            active: pathname === `/${params.storeId}/store/orders`
        },
        {
            href: `/${params.storeId}/store/customers`,
            label: 'customers',
            active: pathname === `/${params.storeId}/store/customers`
        },
        {
            href: `/${params.storeId}/store/coupons`,
            label: 'coupons',
            active: pathname === `/${params.storeId}/store/coupons`
        },
        {
            href: `/${params.storeId}/store/reviews`,
            label: 'reviews',
            active: pathname === `/${params.storeId}/store/reviews`
        },
    ]

    const websiteRoutes = [
        {
            href: `/${params.storeId}/website#herosections`,
            label: 'hero sections',
            active: pathname === `/${params.storeId}/website#herosections`
        },
    ]

    const newProductRoutes = [
        {
            href: `/${params.storeId}/store/products/new-product#details`,
            label: 'detailes',
            active: pathname === `/${params.storeId}/store/products/new-product/#details`
        },
        {
            href: `/${params.storeId}/store/products/new-product#mainImage`,
            label: 'main image',
            active: pathname === "/store/products/new-product#mainImage"
        },
        {
            href: `/${params.storeId}/store/products/new-product/#imagesGallery`,
            label: 'image gallry',
            active: pathname === `/${params.storeId}/store/products/new-product/#imagesGallery`
        },
        {
            href: `/${params.storeId}/store/products/new-product/#prices`,
            label: 'prices',
            active: pathname === `/${params.storeId}/store/products/new-product/#prices`
        },
        {
            href: `/${params.storeId}/store/products/new-product/#inventory`,
            label: 'inventory',
            active: pathname === `/${params.storeId}/store/products/new-product/#inventory`
        },
        {
            href: `/${params.storeId}/store/products/new-product/#orgainization`,
            label: 'Orgainization',
            active: pathname === `/${params.storeId}/store/products/new-product/#orgainization`
        },
        {
            href: `/${params.storeId}/store/products/new-product/#publishing`,
            label: 'Publishing',
            active: pathname === `/${params.storeId}/store/products/new-product/#publishing`
        },
        {
            href: `/${params.storeId}/store/products/new-product/#deliveryDetailes`,
            label: 'Delivery Detailes',
            active: pathname === `/${params.storeId}/store/products/new-product/#deliveryDetailes`
        },
    ]


    function getRoutes() {
        switch (true) {
            case pathname?.includes(`/${params.storeId}/store/products/new-product`):
                return newProductRoutes;
            case pathname?.startsWith(`/${params.storeId}/store`):
                return storeRoutes;
            case pathname?.startsWith(`/${params.storeId}/website`):
                return websiteRoutes;
            default:
                return [];
        }
    }

    const currentRoutes = getRoutes();


    return (
        <nav className={cn("flex space-x-6", className)}>
            {currentRoutes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-[14px] font-light transition-colors hover:text-primary",
                        route.active ? "text-black font-medium active dark:text-white" : "text-black"
                    )}
                >
                    <span
                    >
                        {route.label}
                    </span>
                </Link>
            ))}
        </nav>
    )
};