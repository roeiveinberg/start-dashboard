"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"


import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { ColorColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"


const one = {
    hidden: {
        opacity: 0,
        x: -10,
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.2,
            duration: 0.6
        },
    },
}

const two = {
    hidden: {
        opacity: 0,
        x: -10,
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.3,
            duration: 0.6
        },
    },
}

const three = {
    hidden: {
        opacity: 0,
        x: -10,
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.4,
            duration: 0.6
        },
    },
}

const four = {
    hidden: {
        opacity: 0,
        x: -10,
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.5,
            duration: 0.6
        },
    },
}

const five = {
    hidden: {
        opacity: 0,
        x: -10,
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.6,
            duration: 0.6
        },
    },
}

const six = {
    hidden: {
        opacity: 0,
        x: -10,
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.7,
            duration: 0.6
        },
    },
}


interface ColorsClientProps {
    data: ColorColumn[]
}


export const ColorsClient: React.FC<ColorsClientProps> = ({
    data
}) => {

    const router = useRouter()
    const params = useParams()

    return (
        <>
            <motion.div
                variants={one}
                initial="hidden"
                animate="show"
                className="flex items-center justify-between">
                <Heading
                    title={`colors [${data.length}]`}
                    description="Manage colors attribute for your products"
                />
                <motion.div
                    variants={two}
                    initial="hidden"
                    animate="show"
                    className="mb-10">
                    <motion.div
                        variants={three}
                        initial="hidden"
                        animate="show"
                    >
                        <Button onClick={() => router.push(`/${params.storeId}/store/attributes/colors/new-color`)}>
                            <Plus className="mr-2 h-4 w-4" />
                            add new
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                variants={four}
                initial="hidden"
                animate="show"
                className=" mt-2">
                <DataTable columns={columns} data={data} searchKey="name" />
            </motion.div>

            {/* <motion.div
                variants={five}
                initial="hidden"
                animate="show"
            >
                <Heading
                    title="API"
                    description="API calls for sizes"
                />
            </motion.div>

            <motion.div
                variants={six}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-y-6">
                <ApiList entityName="colors" entityIdName="colorId" />
            </motion.div> */}
        </>
    )
}