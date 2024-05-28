import { SAFETY_TIPS } from "@/constants";


export default async function page() {
    return (
        <main className='min-h-screen mt-28 mb-44 mx-20'>
            <h3 className="text-2xl text-center text-primary pt-10"> Tips for a Safe and Happy Living Experience </h3>
            <ul className="mt-14 list-decimal text-primary px-36">
                {SAFETY_TIPS.map((tip, index) => {
                    return (
                        <li key={index} className="mt-5 max-w-[900px]">
                            <h4 className="text-lg text-primary"> {tip.title} </h4>
                            <p className="text-base text-primary leading-8 font-palanquin mt-3 ml-4"> {tip.description} </p>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}
