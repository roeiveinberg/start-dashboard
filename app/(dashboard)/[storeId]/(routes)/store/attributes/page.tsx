import prismadb from "@/lib/prismadb";
import { SizesClient } from "./sizes/components/client";
import { SizeColumn } from "./sizes/components/columns";
import { format } from "date-fns";
import { ColorColumn } from "./colors/components/columns";
import { ColorsClient } from "./colors/components/client";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";


const AttriburesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })


    const formattedSizes: SizeColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }))

    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })


    const formattedColors: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }))


    return (
        <div className="flex-1 p-14 pt-12">
            <SizesClient data={formattedSizes} />
            <div>
                <Separator className="mt-10" />
            </div>
            <div className="mt-10">
                <ColorsClient data={formattedColors} />
            </div>
        </div>
    );
}

export default AttriburesPage;