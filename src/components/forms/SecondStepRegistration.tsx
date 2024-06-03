'use client'

import { SOCIALS } from "@/constants"
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
import ClipLoader from "react-spinners/ClipLoader"
import { STATE } from "./SignupForm"
import AvatarUploader from "../AvatarUploader"
import { SecondStepUpdate } from "@/actions"
import toast from "react-hot-toast"
import axios from "axios"

interface Props {
    state: STATE
    setState: React.Dispatch<React.SetStateAction<STATE>>
}

type STATE_TYPE = {
    currentLink: number,
    showLinks: number[],
    isLoading: boolean,
    numberOfRoommates: number,
    roommatesNumberError: string,
    hasRentedRoom: boolean | null,
    pplLivingWith: string,
    pplLivingWithError: string,
    currentRentPrice?: string,
    currentRentPriceError?: string
}

const INITIAL_STATE : STATE_TYPE = {
    currentLink: 1,
    showLinks: [SOCIALS.facebook],
    isLoading: false,
    numberOfRoommates: 0,
    roommatesNumberError: "",
    hasRentedRoom: null,
    pplLivingWith: "",
    pplLivingWithError: ""
}

export default function SecondStepRegistration({state, setState} : Props) {

    const [allSatate, setAllStates] = useState<STATE_TYPE>(INITIAL_STATE)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])    

    useEffect(() => {

        if(!allSatate.showLinks.includes(allSatate.currentLink)){
            setAllStates((allstates) => {
                return {...allstates, showLinks: [...allSatate.showLinks, allSatate.currentLink]}
            })
        }
        if(allSatate.pplLivingWithError || allSatate.currentRentPriceError){
            window.scrollTo(0, 0)
        }
    }, [allSatate.currentLink, allSatate.pplLivingWithError, allSatate.currentRentPriceError])

    const form = useForm<z.infer<typeof  SecondStepSchema>>({
        resolver: zodResolver(SecondStepSchema),
        defaultValues: {
            facebook: undefined,
            instagram: undefined,
            telegram: undefined,
            budget: "",
            image: [],
            description: "",
        },
    })

    async function onSubmit(values: z.infer<typeof SecondStepSchema>){
        if(!values.facebook?.link && !values.instagram?.link && !values.telegram?.link){
            form.setError("facebook", {
                message: "provide at least one link"
            })
        }
        if(!allSatate.numberOfRoommates){
            setAllStates((allstates) => {
                return {...allstates, roommatesNumberError: "please select the number of roommates"}
            })
            return
        }
        if(allSatate.hasRentedRoom && !allSatate.pplLivingWith){
            setAllStates((allstates) => {
                return {...allstates, pplLivingWithError: "please provide this field"}
            })
            return
        }
        if(allSatate.pplLivingWith && !/^\d+$/.test(allSatate.pplLivingWith)){
            setAllStates((allstates) => {
                return {...allstates, pplLivingWithError: "Invalid input. enter a number"}
            })
            return
        }   
        if(allSatate.currentRentPrice && !/^\d+$/.test(allSatate.currentRentPrice)){
            setAllStates((allstates) => {
                return {...allstates, currentRentPriceError: "Invalid input. enter a number"}
            })
            return
        }

        let tempSocials = []
        if(values.facebook?.type && values.facebook.link){
            tempSocials.push(values.facebook)
        }
        if(values.instagram?.type && values.instagram.link){
            tempSocials.push(values.instagram)
        }
        if(values.telegram?.type && values.telegram.link){
            tempSocials.push(values.telegram)
        }
        
        setAllStates((allstates) => {
            return {...allstates, isLoading: true}
        })

        try{

            const imageData = await uploadStagedFile(values.image.at(0) as File)
            const data = {
                socialLinks: tempSocials,
                numberOfRoommatesNeeded: allSatate.numberOfRoommates ,
                hasRentedRoom: allSatate.hasRentedRoom === null ? false : allSatate.hasRentedRoom,
                peopleLivingWith: allSatate.hasRentedRoom ? parseInt(allSatate.pplLivingWith) : null,
                currentRentPrice: allSatate.currentRentPrice ? parseInt(allSatate.currentRentPrice) : null,
                budget: `${values.budget} birr/month`,
                image: imageData.imageUrl ? imageData.imageUrl : null,
                description: values.description,
                userId: state.userId as string
            }

            const result = await SecondStepUpdate(data)
            if(result?.error){
                return toast.error(result.error)
            }
            //  If Everything is good , move to the next step
            setState((statedata) => {
                return {...statedata, secondStep: false, thirdStep: true}
            })
        }
        catch(error: any){
            console.log(error)
            toast.error("Something went wrong try again")
        }
        finally{
            setAllStates((allstates) => {
                return {...allstates, isLoading: false}
            })
        }
    }
    
    async function uploadStagedFile(stagedFile: File){
        if(!stagedFile) return
        // To send files over HTTP, we need to use a special type of request called a multipart/form-data request. This type of request allows us to send multiple parts, or chunks, of an image or a file in a single request.
        const form = new FormData()
        // Injecting our image into the formData. formData is a JavaScript object that represents a set of key-value pairs
        form.set("file", stagedFile)
        try{
            const result = await axios.post("/api/upload", form)
            return result.data
        }
        catch(error: any){
            return {
                error
            }
        }
    }
    function handleHideLink({link, type}: {link: number, type: "facebook" | "instagram" | "telegram"}){
        const tempLinkList = allSatate.showLinks.filter((value) => value !== link)
        setAllStates((allstates) => {
            return {...allstates, showLinks: tempLinkList}
        })
        form.setValue(type, undefined)
    }


    return (
        <section className="flex flex-col flex-1 items-start max-sm:px-5 sm:px-10 md:px-20 py-3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* USER HAS RENTED ROOM */}
                    <div>
                        <h3 className="max-sm:text-base sm:text-lg text-primary"> Do you already have a rented room or house?
                            <span className="text-sm text-red-500 ml-2 pb-2"> * </span>
                        </h3>
                        <div className="flex items-center gap-3 mt-6">
                            <Checkbox checked={allSatate.hasRentedRoom === true} onClick={() => setAllStates((allstates) => {
                                return {...allstates, hasRentedRoom: allSatate.hasRentedRoom ? null : true}
                            })} className="focus-visible:outline-none" />
                            <p> Yes </p>
                        </div>
                        {allSatate.hasRentedRoom && <div className="mt-5 pl-7">
                            <div>
                                <h3 className="text-base text-primary"> How many people live with you ? 
                                <span className="text-sm text-red-500 ml-2 pb-2"> * </span>
                                </h3>
                                <p className="text-sm text-secondary mt-2"> type 0 if you live alone </p>
                                <input type="text" onChange={(e) => setAllStates((allstates) => {
                                    return {...allstates, pplLivingWith: e.target.value}
                                })} className="mt-3 w-[250px] px-3 py-2 bg-primary focus-visible:outline-none rounded-md text-sm text-black" />
                                {allSatate.pplLivingWithError && <p className="text-sm text-red-500 mt-1"> {allSatate.pplLivingWithError} </p>}
                            </div>
                            <div className="mt-4">
                                <h3 className="text-base text-primary"> what is the current rent you are paying ? 
                                    <span> ( optional ) </span>
                                </h3>
                                <input type="text" onChange={(e) => setAllStates((allstates) => {
                                    return {...allstates, currentRentPrice: e.target.value}
                                })} className="mt-3 w-[250px] px-3 py-2 bg-primary focus-visible:outline-none rounded-md text-sm text-black" />
                                {allSatate.currentRentPriceError && <p className="text-sm text-red-500 mt-1"> {allSatate.currentRentPriceError} </p>}
                            </div>
                        </div>
                        }
                        <div className={`flex items-center gap-3 mt-4`}>
                            <Checkbox checked={allSatate.hasRentedRoom === false} onClick={() => setAllStates((allstates) => {
                                return {...allstates, hasRentedRoom: allSatate.hasRentedRoom === false ? null : false}
                            })} className="focus-visible:outline-none" />
                            <p> No </p>
                        </div>
                    </div>
                    {/* NUMBER OF ROOMMATES NEEDED */}
                    <div className="mt-8">
                        <h3 className="max-sm:text-base sm:text-lg text-primary"> How many roommates do you need ?
                        <span className="text-sm text-red-500 ml-2 pb-2"> * </span>
                        </h3>
                        {allSatate.roommatesNumberError && <p className="mt-3 text-sm text-red-500"> {allSatate.roommatesNumberError} </p>}
                        <div className="flex items-center gap-4 mt-4">
                            <Checkbox checked={allSatate.numberOfRoommates === 1} onClick={() => {
                                setAllStates((allstates) => {
                                    return {...allstates, numberOfRoommates: 1}
                                })
                            }} className="focus-visible:outline-none" />
                            <p className="pt-0.5"> 1 </p>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                            <Checkbox checked={allSatate.numberOfRoommates === 2} onClick={() => {
                                setAllStates((allstates) => {
                                    return {...allstates, numberOfRoommates: 2}
                                })
                            }} className="focus-visible:outline-none" />
                            <p  className="pt-0.5"> 2 </p>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                            <Checkbox checked={allSatate.numberOfRoommates === 3} onClick={() => {
                                setAllStates((allstates) => {
                                    return {...allstates, numberOfRoommates: 3}
                                })
                            }} className="focus-visible:outline-none" />
                            <p  className="pt-0.5"> 3 </p>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                            <Checkbox checked={allSatate.numberOfRoommates === 4} onClick={() => {
                                setAllStates((allstates) => {
                                    return {...allstates, numberOfRoommates: 4}
                                })
                            }} className="focus-visible:outline-none" />
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
                            <FormLabel className="max-sm:text-base sm:text-lg text-primary"> 
                            What's your budget ?
                            <span className="text-sm text-red-500 ml-2 pb-2"> * </span>
                            </FormLabel>
                            <p className="mt-2 text-sm text-secondary"> The Maximum rent you're willing to pay</p>
                            <FormControl className="mt-4">
                                <input type="text" disabled={allSatate.isLoading} {...field} placeholder="8,000" className=" max-sm:w-[200px] sm:w-[250px] md:w-[300px] text-black text-sm px-3 py-2.5 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        )}
                        />
                    </div>
                    {/* SOCIAL LINKS */}
                    <div className="flex flex-col items-start gap-5 mt-10">
                        {allSatate.showLinks.includes(SOCIALS.facebook) && <FormField
                        control={form.control}
                        name="facebook"
                        render={({ field }) => (
                        <FormItem className="flex flex-col items-start gap-3">
                            <FormLabel> 
                                <div className="flex items-center gap-2">
                                    <p className="max-sm:text-base sm:text-xl text-primary"> Add your social media Profiles </p>
                                    <span className="text-sm text-red-500"> * </span>
                                </div>
                                <p  className="text-sm text-secondary mt-3"> add at least one social media link </p>
                            </FormLabel>
                            <FormControl>
                                <SocialLink image={Facebook} alt="facebook" isLoading={allSatate.isLoading} fieldChange={field.onChange} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        )}
                        />}
                        {allSatate.showLinks.includes(SOCIALS.instagram) && <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex items-center gap-6">
                                    <SocialLink image={Instagram} alt="instagram" isLoading={allSatate.isLoading} fieldChange={field.onChange} />
                                    <button onClick={() => handleHideLink({link: SOCIALS.instagram, type: "instagram"})} className="pt-10">
                                        <IoCloseCircleOutline className="w-7 h-7 text-red-500" />
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        )}
                        />}
                        {allSatate.showLinks.includes(SOCIALS.telegram) && <FormField
                        control={form.control}
                        name="telegram"
                        render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex items-center gap-6">
                                    <SocialLink image={Telegram} alt="telegram" isLoading={allSatate.isLoading} fieldChange={field.onChange} />
                                    <button onClick={() => handleHideLink({link: SOCIALS.telegram, type: "telegram"})} className="pt-10">
                                        <IoCloseCircleOutline className="w-7 h-7 text-red-500" />
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        )}
                        />}
                        { !allSatate.showLinks.includes(SOCIALS.telegram) && <button type="button" onClick={() => {
                            setAllStates((allstates) => {
                                return {...allstates, currentLink: allSatate.currentLink >= 3 ? 1 : allSatate.currentLink + 1}
                            })
                        }} className="mt-4 flex items-center gap-2 bg-button px-3.5 py-2 rounded-md text-sm text-black focus-visible:outline-none border-none font-semibold">
                            <GoPlus className="w-5 h-5 text-black" />
                            <p> Add more link </p>
                        </button>}
                    </div>
                    {/* IMAGE UPLOADER */}
                    <div className="mt-9">
                        <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                        <FormItem className="flex flex-col justify-start gap-5">
                            <FormLabel className="max-sm:text-base sm:text-lg text-primary">
                                Upload your profile image
                            </FormLabel>
                            <FormControl>
                                <AvatarUploader fieldchange={field.onChange} mediaUrl="/public/userAvatar.png" />
                            </FormControl>
                            <FormMessage />
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
                                <FormLabel className="max-sm:text-base sm:text-lg text-primary">
                                    How do you describe yourself ?
                                    <span className="text-sm text-red-500 ml-2"> * </span>
                                </FormLabel>
                                <FormControl>
                                    <textarea {...field} disabled={allSatate.isLoading} className="max-sm:w-full sm:w-[350px] md:w-[400px] max-lg:h-[100px] lg:h-[120px] bg-primary borde rounded-md px-5 py-4 focus-visible:outline-none text-sm text-black" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <button type="submit" disabled={allSatate.isLoading} className="mt-14 w-[200px] bg-button px-3.5 py-2 rounded-md text-base text-black focus-visible:outline-none border-none font-semibold disabled:cursor-not-allowed">
                    {allSatate.isLoading ? (
                        <ClipLoader
                        color="#ffffff"
                        loading={true}
                        size={24}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        className="mt-2"
                        />
                    ) : "Next" }
                    </button>
                </form>
            </Form>
        </section>
    )
}
