"use client"

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Category, Color, Image, Product, Size, Tags } from "@prisma/client"
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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import ImageUploadPreview from "@/components/ui/image-upload-product-preview";



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
    description: z.string().min(4),
    price: z.coerce.number().min(1),
    productCost: z.coerce.number(),
    mainImage: z.string(),
    images: z.object({ url: z.string() }).array(),
    quantity: z.coerce.number().min(1),
    Weight: z.coerce.number().min(1).optional(),
    height: z.coerce.number().min(1).optional(),
    width: z.coerce.number().min(1).optional(),
    Length: z.coerce.number().min(1).optional(),
    tagId: z.string().min(1).optional(),
    categoryId: z.string().min(1),
    colorId: z.string().min(1).optional(),
    sizeId: z.string().min(1).optional(),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
})

type ProductFormValues = z.infer<typeof formSchema>;


interface ProductFormProps {
    initialData: Product & {
        images: Image[]
    } | null;
    categories: Category[]
    colors: Color[]
    sizes: Size[]
    tags: Tags[]
}

// -------

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
    colors,
    sizes,
    tags
}) => {

    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const title = initialData ? "Edit product" : "Create product"
    const description = initialData ? "Edit a product" : "Add a new product"
    const toastMassage = initialData ? "product updated" : "product created"
    const action = initialData ? "Save changes" : "Create product"


    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            price: parseFloat(String(initialData?.price)),
            productCost: parseFloat(String(initialData?.productCost)),
        } : {
            name: '',
            description: '',
            mainImage: '',
            images: [],
            price: 0,
            productCost: 0,
            quantity: 0,
            Weight: 0,
            height: 0,
            width: 0,
            Length: 0,
            tagId: '',
            categoryId: '',
            colorId: '',
            sizeId: '',
            isFeatured: false,
            isArchived: false,
        }
    });

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/products`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/store/products`)
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
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
            router.refresh()

            router.push(`/${params.storeId}/store/products`)
            toast.success("product deleted")

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

            <motion.div className="flex">
                <motion.div className="flex-1 p-14 pt-12 ">
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
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">

                            <motion.div
                                variants={two}
                                initial="hidden"
                                animate="show"
                                className="space-y-20"
                            >

                                <motion.div className=" space-y-4" id="details">
                                    <p>detailes</p>
                                    <motion.div
                                        variants={three}
                                        initial="hidden"
                                        animate="show"
                                        className="flex-col space-y-6 border max-w-2xl py-8 px-8 mt-0">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>product name</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={loading} className=" bg-gray-100" placeholder="for example: bottle of water" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>product description</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={loading} className="bg-gray-100 pb-28 pt-5" placeholder="for example: Natural organic mineral water from the Himalayas in a mixture of eternal health" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                </motion.div>

                                {/* ----- */}

                                <motion.div className=" space-y-4" id="mainImage">
                                    <p>main image</p>
                                    <motion.div
                                        variants={three}
                                        initial="hidden"
                                        animate="show"
                                        className="flex-col space-y-6 border max-w-2xl py-8 px-8 mt-0">
                                        <FormField
                                            control={form.control}
                                            name="mainImage"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>main image</FormLabel>
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
                                </motion.div>


                                {/* ----- */}


                                <motion.div className=" space-y-4" id="imagesGallery">
                                    <p>images gallery</p>
                                    <motion.div
                                        variants={three}
                                        initial="hidden"
                                        animate="show"
                                        className="flex-col space-y-6 border max-w-2xl py-8 px-8 mt-0">
                                        <FormField
                                            control={form.control}
                                            name="images"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>images gallery</FormLabel>
                                                    <FormControl>
                                                        <ImageUpload
                                                            value={field.value.map((image) => image.url)}
                                                            disabled={loading}
                                                            onChange={(url) => field.onChange([...field.value, { url }])}
                                                            onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                </motion.div>


                                {/* ----- */}

                                <motion.div className=" space-y-4" id="prices">
                                    <p>prices</p>
                                    <motion.div
                                        variants={three}
                                        initial="hidden"
                                        animate="show"
                                        className="grid grid-flow-col space-x-6 border max-w-2xl py-8 px-8 ">
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>product price</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" disabled={loading} className="w-full" placeholder="" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="productCost"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>product cost</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" disabled={loading} className="w-full" placeholder="" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                </motion.div>

                                {/* ----- */}


                                <motion.div className=" space-y-4" id="inventory">
                                    <p>inventory</p>
                                    <motion.div
                                        variants={three}
                                        initial="hidden"
                                        animate="show"
                                        className="grid grid-flow-col space-x-6 border max-w-2xl py-8 px-8 ">
                                        <FormField
                                            control={form.control}
                                            name="quantity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>quantity</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" disabled={loading} className="w-full" placeholder="" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                </motion.div>

                                {/* ----- */}


                                <motion.div className=" space-y-4" id="orgainization">
                                    <p>orgainization</p>
                                    <motion.div
                                        variants={three}
                                        initial="hidden"
                                        animate="show"
                                        className="flex-col space-y-6 border max-w-2xl py-8 px-8 mt-0">
                                        <FormField
                                            control={form.control}
                                            name="categoryId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>select category</FormLabel>
                                                    <Select
                                                        disabled={loading}
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    defaultValue={field.value}
                                                                    placeholder="Select a hero section" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {categories.map((category) => (
                                                                <SelectItem
                                                                    key={category.id}
                                                                    value={category.id}
                                                                >
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="sizeId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>select size</FormLabel>
                                                    <Select
                                                        disabled={loading}
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    defaultValue={field.value}
                                                                    placeholder="Select a hero section" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {sizes.map((size) => (
                                                                <SelectItem
                                                                    key={size.id}
                                                                    value={size.id}
                                                                >
                                                                    {size.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="colorId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>select color</FormLabel>
                                                    <Select
                                                        disabled={loading}
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    defaultValue={field.value}
                                                                    placeholder="Select a hero section" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {colors.map((color) => (
                                                                <SelectItem
                                                                    key={color.id}
                                                                    value={color.id}
                                                                >
                                                                    {color.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tagId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>select tag</FormLabel>
                                                    <Select
                                                        disabled={loading}
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    defaultValue={field.value}
                                                                    placeholder="Select a hero section" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {tags.map((tag) => (
                                                                <SelectItem
                                                                    key={tag.id}
                                                                    value={tag.id}
                                                                >
                                                                    {tag.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                </motion.div>

                                {/* ----- */}


                                <motion.div className=" space-y-4" id="publishing">
                                    <p>publishing</p>
                                    <motion.div
                                        variants={three}
                                        initial="hidden"
                                        animate="show"
                                        className="flex-col space-y-6 border max-w-2xl py-8 px-8 mt-0">
                                        <FormField
                                            control={form.control}
                                            name="isFeatured"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-4">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormLabel>featurred</FormLabel>
                                                    <FormDescription>
                                                        this products will appeer on the feauterd product
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Separator />
                                        <FormField
                                            control={form.control}
                                            name="isArchived"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-4">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormLabel>archived</FormLabel>
                                                    <FormDescription>
                                                        this products will not appeer in anywere in the store
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                </motion.div>

                                {/* ----- */}


                                <motion.div className=" space-y-4" id="deliveryDetailes">
                                    <p>delivery detailes</p>
                                    <motion.div
                                        variants={three}
                                        initial="hidden"
                                        animate="show"
                                        className="flex-col space-y-6 border max-w-2xl py-8 px-8 mt-0">
                                        <FormField
                                            control={form.control}
                                            name="Weight"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Weight</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" disabled={loading} className="w-full" placeholder="" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="height"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>height</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" disabled={loading} className="w-full" placeholder="" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="width"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>width</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" disabled={loading} className="w-full" placeholder="" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="Length"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Length</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" disabled={loading} className="w-full" placeholder="" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                </motion.div>

                                {/* ----- */}


                            </motion.div>

                            <motion.div
                                variants={four}
                                initial="hidden"
                                animate="show"
                            >
                                <Button disabled={loading} className="ml-auto mt-10" type="submit">
                                    {action}
                                </Button>
                            </motion.div>
                        </form>
                    </Form>
                </motion.div>



                {/* product preview */}


                {/* <motion.div>
                    <Form {...form}>
                        {
                            !initialData && (
                                <motion.div className="w-[300px] border flex-col justify-between p-4 mr-16 mt-14 sticky top-24">
                                    <FormField
                                        control={form.control}
                                        name="mainImage"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>main image</FormLabel>
                                                <FormControl>
                                                    <ImageUploadPreview
                                                        value={field.value ? [field.value] : []}
                                                        disabled={loading}
                                                        onChange={(url) => field.onChange(url)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <motion.div>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input disabled={loading} className="p-0 bg-transparent border-0" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                </motion.div>
                            )
                        }
                    </Form>
                </motion.div> */}
            </motion.div>
        </>
    )
}