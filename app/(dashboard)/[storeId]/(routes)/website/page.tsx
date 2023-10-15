import { format } from "date-fns"
import prismadb from "@/lib/prismadb";

import { Heading } from "@/components/ui/heading";
import { HeroSectionColumn } from "./herosections/components/columns";
import { HeroSectionClient } from "./herosections/components/client";

const WebSitePage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    const heroSections = await prismadb.hero_section.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedHeroSections: HeroSectionColumn[] = heroSections.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
        imageUrl: item.imageUrl
    }))

    return (
        <div className="flex-1 space-y-6 p-14 pt-12">
            <div>
                <HeroSectionClient data={formattedHeroSections} />
            </div>
        </div>
    );
}

export default WebSitePage;