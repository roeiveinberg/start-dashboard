"ue client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary"


import { Button } from "@/components/ui/button";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, []);


    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    if (!isMounted) {
        return null
    }


    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-full h-[400px] hover:w-[2800px] transition-all duration-500 overflow-hidden">
                        <div className="z-10 absolute top-3 right-3">
                            <Button variant="outline" className="border-0 px-4" type="button" onClick={() => onRemove(url)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset="mpn285lv">
                {({ open }) => {
                    const onClick = () => {
                        open()
                    }

                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            upload image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    );
}

export default ImageUpload;