import { Heading } from "@/components/ui/heading";
import prismadb from "@/lib/prismadb";
import { HerosectionForm } from "./components/hero-section-form";

const HeroSectionPage = async ({
    params
}: {
    params: { herosectionId: string }
}) => {



    const heroSection = await prismadb.hero_section.findUnique({
        where: {
            id: params.herosectionId
        }
    });

    return (
        <>
            <div className="flex-col">
                <div className="flex-1 space-y-4">
                    <HerosectionForm initialData={heroSection} />
                </div>

            </div>
        </>
    );
}

export default HeroSectionPage;