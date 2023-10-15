"use client";

import * as z from "zod";
import axios from "axios";
import { Start_Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";


import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { AlertModal } from "@/components/modals/alert-modal";
import { Separator } from "@/components/ui/separator";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";


// ---------


interface SettingsFormProps {
    initialData: Start_Store;
}

const formSchema = z.object({
    name: z.string().min(1),
})

type SettingFormValues = z.infer<typeof formSchema>

export const SettingForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {

    const params = useParams()
    const router = useRouter()
    const origin = useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)


    const form = useForm<SettingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit = async (data: SettingFormValues) => {
        try {
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh()
            toast.success("Store updated")

        } catch (error) {
            toast.error("Something went wrong")

        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh();
            router.push("/")
            toast.success("Store deleted")

        } catch (error) {
            toast.error("Make sure you removed all products and categories first")
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
            <div>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8 w-full">
                        <div className="grid">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>name</FormLabel>
                                        <FormControl>
                                            <Input className="w-[293px]" disabled={loading} placeholder="Store name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex space-x-4">
                            <Button disabled={loading}>
                                save Changes
                            </Button>
                            <Button type="button" variant="outline" className=" text-destructive" disabled={loading} onClick={() => setOpen(true)}>
                                delete store
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="mt-10 mb-10">
                    <Separator />
                </div>
                <ApiAlert
                    title="NEXT_PUBLIC_API_URL"
                    description={`${origin}/api/${params.storeId}`}
                    variant="public"
                />
            </div>
        </>
    )
}
