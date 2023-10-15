"use client"

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Color } from "@prisma/client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion"


import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



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


// ------

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

type ColorFormValues = z.infer<typeof formSchema>;


interface ColorFormProps {
    initialData: Color | null;
}

// -------

export const ColorForm: React.FC<ColorFormProps> = ({
    initialData,
}) => {

    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const title = initialData ? "Edit color" : "Create color"
    const description = initialData ? "Edit a color" : "Add a new color"
    const toastMassage = initialData ? "color updated" : "color created"
    const action = initialData ? "Save changes" : "Create"


    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: '',
        }
    });

    const onSubmit = async (data: ColorFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/colors`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/store/attributes`)
            toast.success(toastMassage)

        } catch (error) {
            toast.error("Somthing went wrong");
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
            router.refresh()

            router.push(`/${params.storeId}/store/attributes`)
            toast.success("color deleted")

        } catch (error) {
            toast.error("Make sure you removed all products using this category first")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />

            <motion.div className="flex-1 p-14 pt-12">
                <motion.div
                    variants={one}
                    initial="hidden"
                    animate="show"
                    className="flex items-center justify-between">
                    <Heading
                        title={title}
                        description={description} />

                    {initialData && (
                        <Button
                            variant="outline"
                            className=" text-red-500 mb-10"
                            onClick={() => setOpen(true)}
                            disabled={loading}
                        >
                            DELETE
                        </Button>
                    )}
                </motion.div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                        <motion.div className="flex-col space-y-6">
                            <motion.div
                                variants={two}
                                initial="hidden"
                                animate="show"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>name</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} className="w-[293px]" placeholder="color name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>
                            <motion.div
                                variants={three}
                                initial="hidden"
                                animate="show"
                            >
                                <FormField
                                    control={form.control}
                                    name="value"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>value</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} className="w-[293px]" placeholder="color value" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="value"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <motion.div
                                                    variants={three}
                                                    initial="hidden"
                                                    animate="show"
                                                    className="p-0.5 w-[293px] border-[0.4px]"
                                                    style={{ backgroundColor: field.value }}>
                                                </motion.div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>
                        </motion.div >
                        <motion.div
                            variants={five}
                            initial="hidden"
                            animate="show"
                        >
                            <Button disabled={loading} className="ml-auto" type="submit">
                                {action}
                            </Button>
                        </motion.div>
                    </form>
                </Form>
            </motion.div>
        </>
    )
}