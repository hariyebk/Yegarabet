import Image from "next/image"
import HeroImage from "/public/roommates1.jpg"
import Link from "next/link"

export default async function Hero() {
    return (
        <div className="flex items-start gap-28">
            <div className="w-[558px] leading-[60px] font-bold">
                <h2 className="text-main text-[60px]"> RoomLink </h2>
                <p className="text-primary text-[56px] mt-5 leading-[65px]"> A place where you can find Compatible Roommates</p>
                <p className="text-[25px] text-secondary mt-5 leading-9"> We Know Living Alone is Expensive. Cut down Your costs by sharing with others. </p>
                <div className="mt-14">
                    <Link href="/signup" className="w-[300px] bg-main px-6 py-2 text-black text-xl font-bold rounded-sm"> Get started </Link>
                </div>
            </div>
            <Image src={HeroImage} alt="hero-image" width={500} height={180} className="rounded-md" />
        </div>
    )
}
