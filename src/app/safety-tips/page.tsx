import { SAFETY_TIPS } from "@/constants";


export default async function page() {
    return (
        <main className='min-h-screen mt-28 max-sm:mb-16 sm:mb-28 md:mb-36 max-sm:mx-10 sm:mx-20'>
            <h3 className="max-sm:text-lg sm:text-xl lg:text-2xl text-center text-primary pt-10"> Tips for a Safe and Happy Living Experience </h3>
            <ul className="mt-8 list-decimal text-primary flex flex-col items-center justify-start">
                {SAFETY_TIPS.map((tip, index) => {
                    return (
                        <li key={index} className="mt-5 max-w-[800px]">
                            <h4 className="max-sm:text-base sm:text-lg text-primary"> {tip.title} </h4>
                        <p className="max-sm:text-sm sm:text-base text-primary leading-9 mt-3 ml-4"> {tip.description} </p>
                        </li>
                    )
                })}
                <p className="max-sm:text-sm sm:text-base max-sm:mt-7 sm:mt-10 leading-7 max-w-[800px] text-primary"> By following these tips, you can help ensure a safe and positive experience when living with a roommate. Remember to always prioritize your safety and well-being, and don't hesitate to seek help if you need it.
                </p>
            </ul>
        </main>
    )
}
