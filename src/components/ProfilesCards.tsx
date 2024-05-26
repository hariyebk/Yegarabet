'use client'

import Image, { StaticImageData } from "next/image";
import Instagram from "/public/instagram.svg"
import Telegram from "/public/telegram.svg"
import Linkedln from "/public/linkedin.svg"
import Facebook from  "/public/facebook.svg"
import Snapchat from "/public/snapchat.svg"
import { useRouter } from "next/navigation";

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
    residenceLocation: string
}

export default function ProfilesCards({firstName, socials, budget, image, age, sex, profession, numberofRoommates, residenceLocation} : ProfileCardProps) {

    const {push} = useRouter()

    function handleSocialClick(socialLink: string){
        // TODO: Check if the user is authenticated first

    }

    return (
        <section className="w-[305px] h-[300px] border border-slate-700 rounded-[7px] bg-card p-3 mt-2">
            <div className="flex items-center justify-between">
                <h3 className="text-base text-primary font-semibold "> {firstName} </h3>
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
                    <div className="w-fit px-2 py-1.5 bg-inherit border border-red-500 text-sm text-primary rounded-md">
                        needs a room
                        {/* rented a room */}
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
                <div className="flex flex-col justify-start text-sm">
                    <p> {age} Yr old </p>
                    <p className="mt-1"> {sex} </p>
                    <p className="mt-1 truncate"> {profession} </p>
                    <span className="flex items-center">    
                        <p> </p>

                    </span>
                    <p className="mt-2"> I need {`${numberofRoommates === 1 ? `${numberofRoommates} roommate` : `${numberofRoommates} roommates`}`} in </p>
                    <h3 className="text-base text-primary truncate font-semibold mt-2"> {residenceLocation} </h3>
                </div>
            </div>
            <hr className="border border-slate-700 opacity-80 mt-2.5" />
            <div className="flex items-center justify-between mt-5">
                <button className="bg-button w-[130px] p-2.5 rounded-md text-black text-sm font-semibold">
                    View preference
                </button>
            </div>
        </section>
    )
}
