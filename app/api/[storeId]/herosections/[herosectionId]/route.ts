import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function GET(
    req: Request,
    { params }: { params: { herosectionId: string } }
) {
    try {
        if (!params.herosectionId) {
            return new NextResponse("Billboard id is required", { status: 400 })
        }


        const billboard = await prismadb.hero_section.findUnique({
            where: {
                id: params.herosectionId,
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARD_GET]', error);
        return new NextResponse("Interal error", { status: 500 })
    }
}



// -------------------

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, herosectionId: string } }
) {
    try {
        const { userId } = auth()
        const body = await req.json()

        const { label, imageUrl } = body

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!label) {
            return new NextResponse("Label is required", { status: 400 })
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 })
        }

        if (!params.herosectionId) {
            return new NextResponse("Billboard id is required", { status: 400 })
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

        const billboard = await prismadb.hero_section.updateMany({
            where: {
                id: params.herosectionId,
            },
            data: {
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARD_PATCH]', error);
        return new NextResponse("Interal error", { status: 500 })
    }
}


// --------------------------------




export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, herosectionId: string } }
) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.herosectionId) {
            return new NextResponse("Billboard id is required", { status: 400 })
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

        const billboard = await prismadb.hero_section.deleteMany({
            where: {
                id: params.herosectionId,
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error);
        return new NextResponse("Interal error", { status: 500 })
    }
}