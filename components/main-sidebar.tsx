import { UserButton, auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";


import { MainNav } from "@/components/main-sidebar-links";

const MainNavBar = async () => {

    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    return (
        <div className="fixed flex flex-col h-full w-72 z-50 bg-gray-100 justify-between p-[5.5vh] px-[2.2vw]">
            <img src="/start-logo.png" alt="start-logo" width={'30px'} />

            <MainNav />

            <div className="flex items-center">
                <div className="flex items-center">
                    <UserButton afterSignOutUrl="/" />
                    <div className="flex flex-col ml-3">
                        <p className=" text-[12px]">Roei Veinberg</p>
                        <p className=" text-[10px] text-gray-300">roei@gmail.com</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MainNavBar;