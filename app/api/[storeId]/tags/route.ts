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

        const { name } = body

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
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

        const tag = await prismadb.tags.create({
            data: {
                name,
                storeId: params.storeId
            }
        });

        return NextResponse.json(tag)

    } catch (error) {
        console.log('[TAGS_POST]', error);
        return new NextResponse("Interal error", { status: 500 })
    }
}


// ------------


export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {

        if (!params.storeId) {
            return new NextResponse("Store id URL is required", { status: 400 })
        }


        const tags = await prismadb.tags.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(tags)

    } catch (error) {
        console.log('[TAG_GET]', error);
        return new NextResponse("Interal error", { status: 500 })
    }
}