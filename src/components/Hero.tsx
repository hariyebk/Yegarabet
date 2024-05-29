import Image from "next/image"
import HeroImage from "/public/roommates1.jpg"
import Link from "next/link"

export default async function Hero() {
    return (
        <div className="flex items-start gap-36">
            <div className="lg:w-full xl:w-[558px] leading-[60px] font-bold">
                <h2 className="text-main max-md:text-4xl md:text-[60px]"> Yegarabet </h2>
                <p className="text-primary max-sm:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] mt-7 max-sm:leading-10 sm:leading-[45px] md:leading-[55px] lg:leading-[70px] xl:leading-[65px]"> A place where you can find Compatible Roommates</p>
                <p className="max-md:text-xl md:text-[25px] text-secondary max-sm:mt-7 sm:mt-5 sm:leading-10 md:leading-9"> We Know Living Alone is Expensive. Cut down Your costs by sharing with others. </p>
                <div className="mt-10">
                    <Link href="/signup" className="w-[300px] transition-all duration-100 bg-button px-6 max-md:py-2 md:py-3 text-black text-xl font-semibold rounded-md"> Get started </Link>
                </div>
            </div>
            <Image src={HeroImage} alt="hero-image" width={450} height={180} className="rounded-md max-xl:hidden" />
        </div>
    )
}
