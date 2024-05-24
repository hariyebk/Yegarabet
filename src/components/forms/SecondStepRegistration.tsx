'use client'

import { BUDGET_PERIOS, SOCIALS } from "@/constants"
import { useEffect, useState } from "react"
import Instagram from "/public/instagram.svg"
import Telegram from "/public/telegram.svg"
import Facebook from  "/public/facebook.svg"
import { GoPlus } from "react-icons/go";
import SocialLink from "../small-peices/SocialLink"
import { IoCloseCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SecondStepSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Checkbox } from "../ui/checkbox"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select"
import ClipLoader from "react-spinners/ClipLoader"



export default function SecondStepRegistration() {

    const [currentLink, setCurrentLink] = useState<number>(1)
    const [showLinks, setShowLinks] = useState<number[]>([SOCIALS.facebook])
    const [isLoading, setIsLOading] = useState<boolean>(false)
    const [roommates, setRoommates] = useState<number>(0)
    const [roommateError, setRoommateError] = useState<string>("")
    const [budgetPeriod, setBudgetPeriod] = useState<string>(BUDGET_PERIOS.at(2)!)

    useEffect(() => {
        if(!showLinks.includes(currentLink)){
            setShowLinks((links) => [...links, currentLink])
        }
    }, [currentLink])

    const form = useForm<z.infer<typeof  SecondStepSchema>>({
        resolver: zodResolver(SecondStepSchema),
        defaultValues: {
            facebook: undefined,
            instagram: undefined,
            telegram: undefined,
            budget: "",
            description: ""
        },
    })

    async function onSubmit(values: z.infer<typeof SecondStepSchema>){
        if(!values.facebook?.link && !values.instagram?.link && !values.telegram?.link){
            form.setError("facebook", {
                message: "provide at least one link"
            })
        }
        if(!roommates){
            setRoommateError("please select the number of roommates")
        }
        const data = {
            socialLinks: [values.facebook, values.instagram, values.telegram].filter((value) => value !== undefined),
            roommates: roommates ,
            budget: `${values.budget} ${budgetPeriod}`,
            description: values.description
        }
        // TODO: update the user's data
    }

    function handleHideLink({link, type}: {link: number, type: "facebook" | "instagram" | "telegram"}){
        const tempLinkList = showLinks.filter((value) => value !== link)
        setShowLinks(tempLinkList)
        form.setValue(type, undefined)
    }


    return (
        <section className="flex flex-col flex-1 items-start px-20 py-3">
            <h3 className="text-xl text-primary"> Add your social media links </h3>
            <p  className="text-sm text-secondary mt-3"> add at least one social media link </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* SOCIAL LINKS */}
                    <div className="flex flex-col items-start gap-5 mt-7">
                        {showLinks.includes(SOCIALS.facebook) && <FormField
                        control={form.control}
                        name="facebook"
                        render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <SocialLink image={Facebook} alt="facebook" isLoading={isLoading} fieldChange={field.onChange} />
                                {/* <div className="flex items-center gap-6">
                                    <button onClick={() => handleHideLink({link: SOCIALS.facebook, type: "facebook"})} className="pt-10">
                                        <IoCloseCircleOutline className="w-7 h-7 text-red-500" />
                                    </button>
                                </div> */}
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        )}
                        />}
                        {showLinks.includes(SOCIALS.instagram) && <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex items-center gap-6">
                                    <SocialLink image={Instagram} alt="instagram" isLoading={isLoading} fieldChange={field.onChange} />
                                    <button onClick={() => handleHideLink({link: SOCIALS.instagram, type: "instagram"})} className="pt-10">
                                        <IoCloseCircleOutline className="w-7 h-7 text-red-500" />
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        )}
                        />}
                        {showLinks.includes(SOCIALS.telegram) && <FormField
                        control={form.control}
                        name="telegram"
                        render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex items-center gap-6">
                                    <SocialLink image={Telegram} alt="telegram" isLoading={isLoading} fieldChange={field.onChange} />
                                    <button onClick={() => handleHideLink({link: SOCIALS.telegram, type: "telegram"})} className="pt-10">
                                        <IoCloseCircleOutline className="w-7 h-7 text-red-500" />
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        )}
                        />}
                        { !showLinks.includes(SOCIALS.telegram) && <button type="button" onClick={() => setCurrentLink((link) => link >= 3 ? 1 : link + 1)} className="mt-4 flex items-center gap-2 bg-button px-3.5 py-2 rounded-md text-sm text-black focus-visible:outline-none border-none font-semibold">
                            <GoPlus className="w-5 h-5 text-black" />
                            <p> Add more link </p>
                        </button>}
                    </div>
                    {/* NUMBER OF ROOMMATES NEEDED */}
                    <div className="mt-8">
                        <h3 className="text-lg text-primary"> How many roommates do you need ? </h3>
                        {roommateError && <p className="mt-3 text-sm text-red-500"> {roommateError} </p>}
                        <div className="flex items-center gap-4 mt-4">
                            <Checkbox checked={roommates === 1} onClick={() => setRoommates(1)} />
                            <p className="pt-0.5"> 1 </p>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                            <Checkbox checked={roommates === 2} onClick={() => setRoommates(2)} />
                            <p  className="pt-0.5"> 2 </p>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                            <Checkbox checked={roommates === 3} onClick={() => setRoommates(3)} />
                            <p  className="pt-0.5"> 3 </p>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                            <Checkbox checked={roommates === 4} onClick={() => setRoommates(4)} />
                            <p  className="pt-0.5"> 4 </p>
                        </div>
                    </div>
                    {/* BUDGET */}
                    <div className="mt-7">
                        <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                        <FormItem className="flex flex-col items-start gap-2">
                            <FormLabel className="text-lg text-primary"> 
                            What's your budget ?
                            </FormLabel>
                            <FormControl className="mt-4">
                                <div className="flex items-center justify-between max-sm:w-[250px] sm:w-[300px] md:w-[350px] text-black text-sm px-3 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white">
                                    <input type="text" disabled={isLoading} {...field} placeholder="8,000" className="px-2 w-1/2 bg-inherit border-none focus-visible:outline-none" />
                                    <Select onValueChange= {(value) => setBudgetPeriod(value)} defaultValue={budgetPeriod} >
                                        <div>
                                            <SelectTrigger className="bg-primary w-fit px-5 text-black text-base focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-white focus:ring-0">
                                                <SelectValue placeholder={budgetPeriod}/>
                                            </SelectTrigger>
                                        </div>
                                        <SelectContent>
                                            {BUDGET_PERIOS.map((period) => {
                                                return (
                                                    <div key={period}>
                                                        <SelectItem value={period}> {period} </SelectItem>
                                                    </div>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        )}
                        />
                    </div>
                    {/* USER PERSONALITY DESCRIPTION */}
                    <div className="mt-9">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                            <FormItem className="flex flex-col justify-start gap-2">
                                <FormLabel className="text-lg text-primary">
                                    How do you describe yourself ?
                                </FormLabel>
                                <FormControl>
                                    <textarea {...field} className="max-sm:w-[250px] sm:w-[350px] md:w-[400px] max-lg:h-[100px] lg:h-[120px] bg-primary borde rounded-md px-5 py-4 focus-visible:outline-none text-sm text-black" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <button type="submit" className="mt-14 w-[200px] bg-button px-3.5 py-2 rounded-md text-base text-black focus-visible:outline-none border-none font-semibold">
                    {isLoading ? (
                        <ClipLoader
                        color="#ffffff"
                        loading={true}
                        size={24}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        className="mt-2"
                        />
                    ) : "Submit" }
                    </button>
                </form>
            </Form>
        </section>
    )
}
