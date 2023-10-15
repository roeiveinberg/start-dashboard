import prismadb from "@/lib/prismadb";
import { TagsForm } from "./components/tags-form";

const TagsPage = async ({
    params
}: {
    params: { tagId: string, storeId: string }
}) => {

    const tags = await prismadb.tags.findUnique({
        where: {
            id: params.tagId
        }
    });

    return (
        <>
            <div className="flex-col">
                <div className="flex-1 space-y-4">
                    <TagsForm initialData={tags} />
                </div>

            </div>
        </>
    );
}

export default TagsPage;