
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { SettingForm } from "./components/setting-form";
import StoreSwitcher from "@/components/store-switcher";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Heading } from "@/components/ui/heading";
import { ApiAlert } from "@/components/ui/api-alert";


interface SettingsPageProps {
    params: {
        storeId: string
    }
}

const SettingPage: React.FC<SettingsPageProps> = async ({
    params
}) => {

    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const store = await prismadb.start_Store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    const stores = await prismadb.start_Store.findMany({
        where: {
            userId,
        }
    })

    if (!store) {
        redirect("/")
    }

    return (
        <>
            <div className="flex-col w-full">
                <div className="flex-1 space-y-6 p-14 pt-12">
                    <Heading
                        title="Settings"
                        description="Manage store preferences"
                    />
                    <div>
                        <h3 className="mb-3 text-sm">select store</h3>
                        <StoreSwitcher items={stores} />
                    </div>
                    <SettingForm initialData={store} />
                    <div className=" pt-6"></div>
                </div>
            </div>
        </>
    );
}

export default SettingPage;