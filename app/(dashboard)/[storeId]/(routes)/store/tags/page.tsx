
import { format } from "date-fns"
import prismadb from "@/lib/prismadb";


import { TagsColumn } from "./components/columns";
import { TagsClient } from "./components/client";

const TagsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    const tags = await prismadb.tags.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedTags: TagsColumn[] = tags.map((item) => ({
        id: item.id,
        name: item.name,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }))

    return (
        <div className="flex-1 space-y-6 p-14 pt-12">
            <div>
                <TagsClient data={formattedTags} />
            </div>
            <div>

            </div>
        </div>
    );
}

export default TagsPage;