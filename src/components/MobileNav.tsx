"use client"

import { Nav_Links } from "@/constants";
import { useRouter } from "next/navigation";
import { IoCloseCircleSharp } from "react-icons/io5";

interface Props {
    setOpenNav:  React.Dispatch<React.SetStateAction<boolean>>
}

export default function MobileNav({setOpenNav} : Props) {

    const modifiedNavLink = [{label: "Home", path: "/"}, ...Nav_Links]
    const {push} = useRouter()

    function handleNavigation(path: string){
        setOpenNav(false)
        push(path)
    }   

    return (
        <section className="absolute inset-0 top-0 left-0 w-[220px] h-[600px] bg-background border border-slate-700 px-8 py-7 flex flex-col items-start gap-10">
            <button onClick={() => setOpenNav(false)} className="w-full flex justify-end focus-visible:outline-none">
                <IoCloseCircleSharp className="w-6 h-6 text-button" />
            </button>
            <div className="flex flex-col items-start gap-5">
                {modifiedNavLink.map((link) => {
                    return (
                        <div key={link.label}>
                            <button onClick={() => handleNavigation(link.path)} className="text-base text-primary hover:text-main"> {link.label} </button>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
