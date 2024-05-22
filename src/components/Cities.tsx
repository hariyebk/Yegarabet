import { Cities_Images } from "@/constants"
import Image from "next/image"

export default async function Cities() {
    return (
        <main className='mt-28 w-full'>
            <div className="flex justify-center">
                <div className="flex flex-col gap-7">
                    <h2 className="flex justify-center text-5xl text-primary font-bold"> Wherever You Are </h2>
                    <p className="w-[650px] text-lg text-secondary text-center leading-7"> Connect with roommates across different cities and neighborhoods. Our platform helps you find the perfect match for your living situation.</p>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-16 ml-6">
                {Cities_Images.map((element) => {
                    return (
                        <div key={element.label}>
                            <Image src={element.image} alt="city-image" width={200} height={100} className="transition ease-in delay-140 hover:-translate-y-1 hover:scale-110  duration-300"/>
                            <p className="mt-4 text-base text-center text-secondary"> {element.label} </p>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}
