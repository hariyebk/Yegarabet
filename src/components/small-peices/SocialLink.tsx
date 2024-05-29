import Image, { StaticImageData } from "next/image"

interface Props {
    image: StaticImageData,
    alt: string,
    isLoading: boolean,
    fieldChange: ({type, link}: {type: string, link: string}) => void
}

export default function SocialLink({image, alt, isLoading, fieldChange} : Props) {

    return (
        <section className="flex flex-col items-start gap-4">
            <p className="max-sm:text-sm sm:text-base text-primary"> {alt.at(0)?.toUpperCase() + alt.slice(1)} </p>
            <div className="flex items-center gap-4 max-sm:w-[200px] sm:w-[250px] md:w-[300px] text-black text-sm px-3 py-2.5 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white">
                <Image src={image} alt={`${alt}-logo`} width={20} height={20} className="w-[20px] h-[20px]"  />
                <input type="text" disabled={isLoading} onChange={(e) => fieldChange({type: alt, link: e.target.value})}  className="max-sm:w-[150px] sm:w-[200px] md:w-[250px] bg-inherit border-none focus-visible:outline-none" />
            </div>
        </section>
    )
}
