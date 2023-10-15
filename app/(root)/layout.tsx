import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


import prismadb from "@/lib/prismadb";


export default async function SetUpLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.start_Store.findFirst({
        where: {
            userId
        }
    });


    if (store) {
        redirect(`/${store.id}`);
    }

    return (
        <>
            {children}
        </>
    )

}