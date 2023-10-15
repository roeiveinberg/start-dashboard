import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function GET(
    req: Request,
    { params }: { params: { tagId: string } }
) {
    try {
        if (!params.tagId) {
            return new NextResponse("tag id is required", { status: 400 })
        }


        const tag = await prismadb.tags.findUnique({
            where: {
                id: params.tagId,
            },
        })

        return NextResponse.json(tag)

    } catch (error) {
        console.log('[TAG_GET]', error);
        return new NextResponse("Interal error", { status: 500 })
    }
}



// -------------------

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, tagId: string } }
) {
    try {
        const { userId } = auth()
        const body = await req.json()

        const { name } = body

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if (!params.tagId) {
            return new NextResponse("tag id is required", { status: 400 })
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

        const tag = await prismadb.tags.updateMany({
            where: {
                id: params.tagId,
            },
            data: {
                name,
            }
        })

        return NextResponse.json(tag)

    } catch (error) {
        console.log('[TAG_PATCH]', error);
        return new NextResponse("Interal error", { status: 500 })
    }
}


// --------------------------------




export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, tagId: string } }
) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.tagId) {
            return new NextResponse("tag id is required", { status: 400 })
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

        const tag = await prismadb.tags.deleteMany({
            where: {
                id: params.tagId,
            }
        })

        return NextResponse.json(tag)

    } catch (error) {
        console.log('[TAG_DELETE]', error);
        return new NextResponse("Interal error", { status: 500 })
    }
}