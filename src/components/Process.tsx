import { Steps } from "@/constants";
import Link from "next/link";

export default function Process() {
    return (
        <main className='mt-20'>
            <h2 className="flex justify-center text-primary text-4xl font-bold"> Share a home, Save your Money</h2>
            <div className="flex items-start gap-16 mt-20 ml-16">
                {Steps.map((item) => {
                    return (
                        <section key={item.title} className="flex flex-col items-center w-[300px]">
                            <Link href={item.path} className="text-2xl text-main font-bold"> {item.title} </Link>
                            <p className="text-center text-secondary leading-6 mt-4"> {item.description} </p>
                        </section>
                    )
                })}
            </div>
        </main>
    )
}
