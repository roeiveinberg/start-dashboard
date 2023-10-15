"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(1),
})

export const StoreModal = () => {

    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const response = await axios.post('/api/stores', values)

            window.location.assign(`/${response.data.id}`)

        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="px-6 pt-2 pb-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="My-store"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center space-x-2 pt-7 justify-end">
                                <Button
                                    disabled={loading}
                                    variant="outline"
                                    onClick={storeModal.onClose}
                                    type="button"
                                >
                                    cancel
                                </Button>
                                <Button
                                    disabled={loading}
                                    type="submit"
                                >
                                    continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};