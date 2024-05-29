import { Steps } from "@/constants";
import Link from "next/link";

export default function Process() {
    return (
        <main className='max-sm:mt-16 sm:mt-24'>
            <h2 className="flex justify-center text-primary max-sm:text-[19px] sm:text-3xl md:text-4xl font-bold"> Share a home, Save your Money</h2>
            <div className="flex max-md:flex-col max-md:w-full max-md:items-center md:items-start max-md:gap-14 md:gap-10 xl:gap-16 max-sm:mt-10 sm:mt-16 lg:mt-20 xl:ml-16">
                {Steps.map((item) => {
                    return (
                        <section key={item.title} className="flex max-md:flex-col max-md:gap-2 max-sm:px-3 sm:px-5 md:flex-col md:items-center w-full">
                            <Link href={item.path} className="max-sm:text-lg sm:text-2xl xl:text-3xl text-2xl max-md:text-center text-main font-bold"> {item.title} </Link>
                            <p className="text-center text-secondary max-md:leading-8 md:leading-6 max-sm:mt-2 sm:mt-4"> {item.description} </p>
                        </section>
                    )
                })}
            </div>
        </main>
    )
}
