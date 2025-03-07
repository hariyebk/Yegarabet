'use client'

import { Nav_Links } from "@/constants"
import Link from "next/link"
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MobileNav from "./MobileNav";

export function Nav() {

    const [openNav, setOpenNav] = useState<boolean>(false)

    return (
        <div>
            <div className="flex items-center md:gap-10 lg:gap-20">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setOpenNav(true)} className="md:hidden focus-visible:outline-none">
                            <AiOutlineMenu className="w-5 h-5 text-button" />
                        </button>
                        <Link href="/" className="hover:cursor-pointer">
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
                {openNav && <MobileNav setOpenNav={setOpenNav} />}
        </div>
    )
}