"use client"

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { hero_section } from "@prisma/client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";


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
import ImageUpload from "@/components/ui/image-upload";
import Link from "next/link";



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
    label: z.string().min(1),
    imageUrl: z.string().min(1)
})

type HerosectionFormValues = z.infer<typeof formSchema>;


interface HerosectionFormProps {
    initialData: hero_section | null;
}

// -------

export const HerosectionForm: React.FC<HerosectionFormProps> = ({
    initialData
}) => {

    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const title = initialData ? "Edit hero section" : "Create hero section"
    const description = initialData ? "Edit a hero section" : "Add a new hero section"
    const toastMassage = initialData ? "hero section updated" : "hero section created"
    const action = initialData ? "Save changes" : "Create"


    const form = useForm<HerosectionFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    });

    const onSubmit = async (data: HerosectionFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/herosections/${params.herosectionId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/herosections`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/website`)
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
            await axios.delete(`/api/${params.storeId}/herosections/${params.herosectionId}`)
            router.refresh()

            router.push(`/${params.storeId}/website`)
            toast.success("hero section deleted")

        } catch (error) {
            toast.error("Make sure you removed all categories using this billboard first")
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

                        <motion.div
                            variants={two}
                            initial="hidden"
                            animate="show"
                        >
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Background image</FormLabel>
                                        <FormControl>
                                            <ImageUpload
                                                value={field.value ? [field.value] : []}
                                                disabled={loading}
                                                onChange={(url) => field.onChange(url)}
                                                onRemove={() => field.onChange("")}
                                            />
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
                            className="grid grid-cols-3 gap-8">
                            <FormField
                                control={form.control}
                                name="label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Label</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} className="w-[293px]" placeholder="hero section label" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </motion.div>
                        <motion.div
                            variants={four}
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