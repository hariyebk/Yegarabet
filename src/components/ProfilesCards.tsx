'use client'

import Image, { StaticImageData } from "next/image";
import Instagram from "/public/instagram.svg"
import Telegram from "/public/telegram.svg"
import Linkedln from "/public/linkedin.svg"
import Facebook from  "/public/facebook.svg"
import Snapchat from "/public/snapchat.svg"
import { useRouter } from "next/navigation";
import ViewPreferencesOfUser from "./ViewPreferencesOfUser";
import { preferences } from "@/constants";
import useGlobalState from "@/context/hook";

type LOGOS = {
    instagram: StaticImageData,
    facebook: StaticImageData,
    linkedln: StaticImageData,
    telegram: StaticImageData,
    snapchat: StaticImageData
}  & { [key: string]: StaticImageData }

const logos: LOGOS = {
    instagram: Instagram,
    facebook: Facebook,
    linkedln: Linkedln,
    telegram: Telegram,
    snapchat: Snapchat
} 

interface ProfileCardProps {
    firstName: string,
    image: StaticImageData,
    socials: {
        link: string,
        type: string
    }[],
    budget: string
    age: number,
    sex: string,
    profession: string,
    numberofRoommates: number,
    residenceLocation: string,
    i: number,
    details?: boolean
}
// TODO: REMOVE THE INDEX , ITS JUST FOR TESTING

export default function ProfilesCards({firstName, socials, budget, image, age, sex, profession, numberofRoommates, residenceLocation, i, details=false} : ProfileCardProps) {

    const {push} = useRouter()
    const {openPreference, setOpenPreference, openFilter, setOpenFilter} = useGlobalState()

    function handleSocialClick(socialLink: string){
        // TODO: Check if the user is authenticated first
    }

    function handleViewPreferences(){
        //TODO: Check if the user is Authenticated 
        const isAuth = true
        if(isAuth){
            if(openFilter){
                setOpenFilter(false)
            }
            setOpenPreference(true)
        }
        else{
            push("/signin")
        }
    }

    return (
        <section className={`${details ? "w-full" : "w-[305px]"} h-auto border border-slate-700 rounded-[7px] bg-card px-3 pt-3 pb-4 max-sm:mt-6 sm:mt-2`}>
            <div className="flex items-center justify-between">
                {/* TODO: This route hasn't been implemented yet */}
                <button className="text-base text-primary font-semibold "> {firstName} </button>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        {socials.length === 0 ? null : socials.map((social, index) => {
                            return (
                                <div key={index}>
                                    <button onClick={() => handleSocialClick(social.link)}>
                                        <Image src={logos[social.type]} alt="instagram-icon" width={20} height={20} className="mr-2 w-[20px] h-[20px] object-contain" />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    <div className={`w-fit px-2 py-1.5 bg-inherit border ${(i + 1) % 2 === 0 ? "border-green-500" : "border-red-500"} text-sm text-primary rounded-md`}>
                        { (i + 1) % 2 === 0 ? " has a room" : "needs a room" }
                    </div>
                    {/* <button className="text-sm bg-main text-white px-4 py-1 rounded-md">
                        Match
                    </button> */}
                </div>
            </div>
            <span className="flex items-center gap-2 mt-2.5 mb-2">
                <p className="text-[13px]"> Budget - </p>
                <p className="text-xs"> {budget} </p>
            </span>
            <div className="mt-3 flex items-start gap-5">
                <Image src={image} alt="user-image" width={120} height={90} className="rounded-md" />
                <div className={`flex flex-col justify-start ${details ? "gap-2" : "gap-0"} text-sm`}>
                    <p> {age} Yr old </p>
                    <p className="mt-1"> {sex} </p>
                    <p className="mt-1 truncate"> {profession} </p>
                    <div className={`${details ? "flex items-center gap-2" : "flex flex-col justify-start gap-2"}`}>
                        <p className="mt-2"> I need {`${numberofRoommates === 1 ? `${numberofRoommates} roommate` : `${numberofRoommates} roommates`}`} in </p>
                        <h3 className={`${details ? "text-sm mt-2" : "text-base"} text-primary truncate font-semibold`}> {residenceLocation} </h3>
                    </div>
                </div>
            </div>
            {!details && <div>
                <hr className="border border-slate-700 opacity-80 mt-2.5" />
                <div className="flex items-center justify-between mt-3.5">
                    <button onClick={handleViewPreferences} className="bg-button w-[130px] p-2.5 rounded-md text-black text-sm font-semibold focus-visible:outline-none">
                        View preference
                    </button>
                </div>
                <div>
                    {openPreference && <div className="fixed inset-0 top-0 mt-3.5 z-20 overflow-y-hidden">
                        <ViewPreferencesOfUser setViewProfile={setOpenPreference} preferences={preferences} />
                    </div>
                    }
                </div>
            </div> 
            }
        </section>
    )
}
