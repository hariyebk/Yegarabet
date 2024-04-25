import { Nav_Links } from "@/constants"
import Image from "next/image"
import Link from "next/link"

export default async function Navbar() {
    return (
        <main className="w-full fixed p-7 shadow-sm shadow-black">
            <nav className="flex items-center justify-between px-10 ">
                <div className="flex items-center gap-20">
                    <Link href="/">
                        <span> 🏠RoomLink </span>
                    </Link>
                    <ul className="flex items-center gap-10">
                        {Nav_Links.map((link) => {
                            return (
                                <Link href={link.path} key={link.label} className="text-sm text-regular hover:underline-offset-8">
                                    {link.label}
                                </Link>
                            )
                        })}
                    </ul>
                </div>
                <div className="flex items-center gap-14 text-regular text-sm">
                    <Link href="/login"> Login </Link>
                    <Link href="/signup"> Signup </Link>
                </div>
            </nav>
        </main>
    )
}
