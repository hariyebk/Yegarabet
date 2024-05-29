'use client'

import { Nav_Links } from "@/constants"
import Link from "next/link"
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MobileNav from "./MobileNav";

export default function Navbar() {

    const [openNav, setOpenNav] = useState<boolean>(false)

    return (
        <main className="w-full bg-background h-[80px] fixed inset-y-0 top-0 max-md:px-9 max-md:py-5 md:p-7 shadow shadow-black z-10">
            <nav className="flex items-center justify-between md:px-10 ">
                <div className="flex items-center md:gap-10 lg:gap-20">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setOpenNav(true)} className="md:hidden focus-visible:outline-none">
                            <AiOutlineMenu className="w-5 h-5 text-button" />
                        </button>
                        <Link href="/">
                            <span> 🏠Yegarabet </span>
                        </Link>
                    </div>
                    <ul className="max-md:hidden flex items-center gap-10">
                        {Nav_Links.map((link) => {
                            return (
                                <Link href={link.path} key={link.label} className="text-sm text-regular hover:underline-offset-8">
                                    {link.label}
                                </Link>
                            )
                        })}
                    </ul>
                </div>
                <div className="flex items-center max-sm:gap-6 sm:gap-14 text-regular text-sm">
                    <Link href="/signin"> Signin </Link>
                    <Link href="/signup"> Signup </Link>
                </div>
            </nav>
            {openNav && <MobileNav setOpenNav={setOpenNav} />}
        </main>
    )
}
