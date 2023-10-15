import prismadb from "@/lib/prismadb";
import { ColorForm } from "./components/color-form";

const ColorPage = async ({
    params
}: {
    params: { colorId: string }
}) => {

    const size = await prismadb.color.findUnique({
        where: {
            id: params.colorId
        }
    });

    return (
        <>
            <div className="flex-col">
                <div className="flex-1">
                    <ColorForm initialData={size} />
                </div>
            </div>
        </>
    );
}

export default ColorPage;