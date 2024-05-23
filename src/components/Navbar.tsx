import { Nav_Links } from "@/constants"
import Link from "next/link"

export default async function Navbar() {
    return (
        <main className="w-full bg-background h-[80px] fixed inset-y-0 top-0 p-7 shadow shadow-black z-10">
            <nav className="flex items-center justify-between px-10 ">
                <div className="flex items-center gap-20">
                    <Link href="/">
                        <span> 🏠Yegarabet </span>
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
                    <Link href="/signin"> Signin </Link>
                    <Link href="/signup"> Signup </Link>
                </div>
            </nav>
        </main>
    )
}
