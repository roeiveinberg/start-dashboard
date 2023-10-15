import { Button } from "./button"

interface HeadingProps {
    title: string
    description: string
};

export const Heading: React.FC<HeadingProps> = ({
    title,
    description
}) => {


    return (
        <div className="mb-10">
            <h2 className=" font-semibold text-2xl">{title}</h2>
            <p className=" font-light text-sm tracking-wide text-gray-500">{description}</p>
        </div>
    )
}