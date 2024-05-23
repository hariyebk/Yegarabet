'use client'

import { SOCIALS } from "@/constants"
import { useEffect, useState } from "react"
import Instagram from "/public/instagram.svg"
import Telegram from "/public/telegram.svg"
import Facebook from  "/public/facebook.svg"
import { GoPlus } from "react-icons/go";
import SocialLink from "../small-peices/SocialLink"
import { IoCloseCircleOutline } from "react-icons/io5";



export default function SecondStepRegistration() {

    const [facebookValue, setFacebookValue] = useState<{type: string, link: string} | null>(null)
    const [instagramValue, setInstagramValue] = useState<{type: string, link: string} | null>(null)
    const [telegramValue, setTelegramValue] = useState<{type: string, link: string} | null>(null)
    const [currentLink, setCurrentLink] = useState<number>(1)
    const [showLinks, setShowLinks] = useState<number[]>([SOCIALS.facebook])
    const [isLoading, setIsLOading] = useState<boolean>(false)
    let allSocialLinks: {type: string, link: string}[] = []
    if(facebookValue){
        allSocialLinks = [...allSocialLinks, facebookValue]
    }
    if(instagramValue){
        allSocialLinks = [...allSocialLinks, instagramValue]
    }
    if(telegramValue){
        allSocialLinks = [...allSocialLinks, telegramValue]
    }


    useEffect(() => {
        if(!showLinks.includes(currentLink)){
            setShowLinks((links) => [...links, currentLink])
        }
    }, [currentLink])

    function handleHideLink(link: number, setValue: React.Dispatch<React.SetStateAction<{type: string, link: string} | null>>){
        setCurrentLink((value) => value - 1)
        const tempLinkList = showLinks.filter((value) => value !== link)
        setShowLinks(tempLinkList)
        setValue(null)
    }

    function handleSubmit(){
        console.log(allSocialLinks)
    }

    return (
        <section className="flex flex-col flex-1 items-start px-20 py-3">
            <h3 className="text-xl text-primary"> Add your social media links </h3>
            <p  className="text-sm text-secondary mt-3 pl-2"> add at least one social media link </p>
            <div className="flex flex-col items-start gap-5 mt-5">
                { showLinks.includes(SOCIALS.facebook) && <SocialLink image={Facebook} alt="facebook" isLoading={isLoading} setValue={setFacebookValue} />
                }
                {showLinks.includes(SOCIALS.instagram) && <div className="flex items-center gap-6">
                    <SocialLink image={Instagram} alt="instagram" isLoading={isLoading} setValue={setInstagramValue} />
                    <button onClick={() => handleHideLink(SOCIALS.instagram, setInstagramValue)} className="pt-10">
                        <IoCloseCircleOutline className="w-7 h-7 text-red-500" />
                    </button>
                </div>}
                {showLinks.includes(SOCIALS.telegram) && <div className="flex items-center gap-6">
                    <SocialLink image={Telegram} alt="telegram" isLoading={isLoading} setValue={setTelegramValue} />
                    <button onClick={() => handleHideLink(SOCIALS.telegram, setTelegramValue)} className="pt-10">
                        <IoCloseCircleOutline className="w-7 h-7 text-red-500" />
                    </button>
                </div>}
            </div>
            { !showLinks.includes(SOCIALS.telegram) && <button onClick={() => setCurrentLink((link) => link + 1)} className="mt-7 flex items-center gap-2 bg-button px-3.5 py-2 rounded-md text-sm text-black focus-visible:outline-none border-none font-semibold">
                <GoPlus className="w-5 h-5 text-black" />
                <p> Add more link </p>
            </button>}
            <button onClick={handleSubmit} className="mt-10 bg-button px-3.5 py-2 rounded-md text-sm text-black focus-visible:outline-none border-none font-semibold">
                submit links
            </button>
        </section>
    )
}
