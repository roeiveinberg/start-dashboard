import MainNavBar from "@/components/main-sidebar";
import { Topnav } from "@/components/top-nav-links";
import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation"

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in");
    }

    const store = await prismadb.start_Store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!store) {
        redirect('/')
    }

    return (
        <>
            <div className="flex h-full w-full">
                <MainNavBar />
                <div className="w-full pl-72  pt-[60px]">
                    <div className="fixed z-[500] top-0 backdrop-blur-xl flex items-center px-14 border-b w-full h-[60px] space-x-5 justify-between">
                        <Topnav />
                        <div className=" absolute right-80 flex space-x-4">
                            <img src="/voice-icon.svg" alt="" />
                            <img src="/search-icon.svg" alt="" />
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}