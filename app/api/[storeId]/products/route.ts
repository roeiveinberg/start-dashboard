import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth()
        const body = await req.json()

        const {
            name,
            price,
            description,
            mainImage,
            productCost,
            quantity,
            Weight,
            height,
            width,
            Length,
            tagId,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived
        } = body

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if (!images || !images.length) {
            return new NextResponse("Images are required", { status: 400 })
        }

        if (!price) {
            return new NextResponse("Price is required", { status: 400 })
        }

        if (!quantity) {
            return new NextResponse("quantity is required", { status: 400 })
        }

        if (!categoryId) {
            return new NextResponse("CategoryId is required", { status: 400 })
        }

        if (!tagId) {
            return new NextResponse("tagId is required", { status: 400 })
        }

        if (!colorId) {
            return new NextResponse("ColorId is required", { status: 400 })
        }

        if (!sizeId) {
            return new NextResponse("SizeId is required", { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }

        const storeByUserId = await prismadb.start_Store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                mainImage,
                description,
                productCost,
                tagId,
                quantity,
                Weight,
                height,
                width,
                Length,
                colorId,
                sizeId,
                isArchived,
                isFeatured,
                categoryId,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        });

        return NextResponse.json(product)

    } catch (error) {
        console.log('[PRODUCT_POST]', error);
        return new NextResponse("Interal error", { status: 500 })
    }
}


// ------------


export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {

        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get("categoryId") || undefined
        const colorId = searchParams.get("colorId") || undefined
        const tagId = searchParams.get("tagId") || undefined
        const sizeId = searchParams.get("sizeId") || undefined
        const isFeatured = searchParams.get("isFeatured")

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }


        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                tagId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
                tags: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(products)

    } catch (error) {
        console.log('[PRODUCT_GET]', error);
        return new NextResponse("Interal error", { status: 500 })
    }
}