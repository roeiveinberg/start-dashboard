import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex w-full h-full items-center justify-center">
            <span className="loader"></span>
        </div>
    )
}