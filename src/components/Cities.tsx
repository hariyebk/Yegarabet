'use client'

import { Cities_Images } from "@/constants"
import Image from "next/image"

export default function Cities() {

    return (
        <main className='max-sm:mt-20 sm:mt-28 w-full'>
            <div className="flex justify-center">
                <div className="flex flex-col gap-7">
                    <h2 className="flex justify-center max-sm:text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-primary font-bold"> Wherever You Are </h2>
                    <p className="max-md:w-full md:w-[650px] max-sm:text-base sm:text-lg text-secondary text-center leading-7"> Connect with roommates across different cities and neighborhoods. Our platform helps you find the perfect match for your living situation.</p>
                </div>
            </div>
            <div className="flex flex-wrap max-md:flex-col items-center md:justify-center max-sm:gap-10 sm:gap-14 md:gap-12 lg:gap-8 max-sm:mt-14 sm:mt-20 md:mt-16 xl:ml-16">
                {Cities_Images.map((element, index) => {
                    return (
                        <div key={element.label} className="max-sm:px-3">
                            <Image src={element.image} alt="city-image" className="sm:w-[450px] md:w-[250px] md:h-[150px] lg:w-[240px] lg:h-[130px] md:transition md:ease-in delay-140 md:hover:-translate-y-1 md:hover:scale-110 duration-300 rounded-md"/>
                            <p className="max-md:mt-7 md:mt-4 max-md:text-xl md:text-base text-center text-secondary"> {element.label} </p>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}
