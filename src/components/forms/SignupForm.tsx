'use client'

import { SignupFormSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useRef, useState } from "react"
import Link from "next/link"
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "../ui/select"
import { GoEye, GoEyeClosed } from "react-icons/go"
import { cities } from "@/constants"
import SecondStepRegistration from "./SecondStepRegistration"
import Preferences from "./Preferences"
import ReCAPTCHA from "react-google-recaptcha"
import { RegisterUser } from "@/actions"
import toast from "react-hot-toast"
import ClipLoader from "react-spinners/ClipLoader"

export type STATE = {
    firstStep: boolean,
    secondStep: boolean,
    thirdStep: boolean,
    isLoading: boolean,
    showPassword: boolean,
    showConfirmPassword: boolean,
    userId: string
}

const INITIAL_STATE : STATE = {
    firstStep: true,
    secondStep: false,
    thirdStep: false,
    isLoading: false,
    showPassword: false,
    showConfirmPassword: false,
    userId: ""
}

export default function SignupForm() {

    const [state, setState] = useState<STATE>(INITIAL_STATE)
    const [isVerified, setIsVerified] = useState<boolean>(false)
    const recaptchaRef = useRef<ReCAPTCHA>(null)
    const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""

    const form = useForm<z.infer<typeof  SignupFormSchema>>({
        resolver: zodResolver( SignupFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            birthDate: "",
            phoneNumber: "",
            city: "",
            profession: "",
            password: "",
            passwordConfirm: "",
        },
    })

    async function onSubmit(values: z.infer<typeof  SignupFormSchema>){
        const data = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            gender: values.gender,
            birthDate: values.birthDate,
            city: values.city,
            profession: values.profession,
            password: values.password,
            phoneNumber: `0${values.phoneNumber}`,
            passwordConfirm: values.passwordConfirm
        }

        setState((statevalue) => {
            return {...statevalue, isLoading: true}
        })

        try{
            const result = await RegisterUser(data)
            if(result?.error){
                return toast.error(result.error)
            }
            // set the userId state to update the user data on the next step
            setState((statevalues) => {
                return {...statevalues, userId: result.userId as string}
            })
            // update the loading state to false
            setState((statevalue) => {
                return {...statevalue, isLoading: false}
            })
            // show the user the next page
            setState((statevalues) => {
                return {...statevalues, firstStep: false, secondStep: true}
            })
        }
        catch(error: any){
            console.log(error)
            toast.error(error)
        }
    }

    async function handleCaptchaSubmission(token: string | null) {
        try {
            if (token) {
            await fetch("/api/recaptcha", {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });
            setIsVerified(true);
            }
        } catch (e: any) {
            setIsVerified(false);
        }
    }
    function handleCaptchaChange(token: string | null){
        handleCaptchaSubmission(token)
    }
    function handleExpire(){
        setIsVerified(false)
        recaptchaRef.current?.reset()
    }

    return (
    <section className="max-sm:mx-4 sm:mx-6 md:ml-10">
        <header>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css" />
        </header>
        <div className="flex items-center justify-center">
        <div className="mt-7 max-sm:w-full sm:w-[550px] md:w-[700px] h-auto bg-card shadow-xl max-md:rounded-lg rounded-xl pt-10 pb-20">
            {state.firstStep && <div className="flex flex-col flex-1 items-center">
                <h3 className="text-2xl max-md:text-xl text-primary font-palanquin uppercase"> Create your Account </h3>
                <p className="text-sm text-secondary mt-3 mb-2"> Let's get you started. Please enter your details </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-2 mt-7">
                        <div className="createAccountFormContainer">
                            {/* FIRSTNAME */}
                            <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                            <FormItem className="flex flex-col items-start gap-2">
                                <FormLabel className="text-base text-primary"> 
                                First name
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span>
                                </FormLabel>
                                <FormControl>
                                    <input type="text" disabled={state.isLoading} {...field} placeholder="abebe" className="max-sm:w-[230px] sm:w-[250px] text-black text-sm px-3 py-2.5 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white" />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                            />
                            {/* LASTNAME */}
                            <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                            <FormItem className="flex flex-col items-start gap-2 max-md:mt-3">
                                <FormLabel className="text-base text-primary"> 
                                Last name 
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span>
                                </FormLabel>
                                <FormControl>
                                    <input type="text" disabled={state.isLoading} {...field} placeholder="balcha" className="max-sm:w-[230px] sm:w-[250px] text-black text-sm px-3 py-2.5 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white" />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                            />
                        </div>
                        <div className="createAccountFormContainer">
                            {/* EMAIL */}
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem className="mt-6 flex flex-col items-start gap-2">
                                <FormLabel className="text-base text-primary"> 
                                Email
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span> 
                                </FormLabel>
                                <FormControl>
                                    <input type="text" disabled={state.isLoading} {...field} placeholder="abebebaclha@gmail.com" className="max-sm:w-[230px] sm:w-[250px] text-black text-sm px-3 py-3 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white" />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                            />
                            {/* GENDER */}
                            <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                            <FormItem className="max-md:mt-4 mt-6 flex flex-col items-start gap-2">
                                <FormLabel className="text-base text-primary"> 
                                Gender
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span> 
                                </FormLabel>
                                <Select onValueChange= {field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger {...field} className="bg-primary max-sm:w-[230px] sm:w-[250px] px-3 py-2 text-black focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-white focus:ring-0">
                                            <SelectValue placeholder="Select Gender"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Male"> Male </SelectItem>
                                        <SelectItem value="Female"> Female </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem> 
                            )} />
                        </div>
                        <div className="createAccountFormContainer">
                            {/* BIRTHDATE */}
                            <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                            <FormItem className="mt-6 flex flex-col items-start gap-2">
                                <FormLabel className="text-base text-primary"> 
                                Birth Date 
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span>
                                </FormLabel>
                                <FormControl>
                                    <input type="date" disabled={state.isLoading} {...field} placeholder="abebe" className="max-sm:w-[230px] sm:w-[250px]  text-black text-sm px-3 py-2.5 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white" />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                            />
                            {/* PHONE NUMBER */}
                            <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                            <FormItem className="mt-6 flex flex-col items-start gap-2 max-md:mt-2">
                                <FormLabel className="text-base text-primary">
                                Phone number 
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span>
                                </FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-2 max-sm:w-[230px] sm:w-[250px] text-black text-sm px-3 py-2.5 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white">
                                        <div className="flex items-center gap-2">
                                            <div className="block">
                                                <span className="fi fi-et" />
                                            </div>
                                            <p className="text-sm"> +251 </p>
                                        </div>
                                        <input type="text" disabled={state.isLoading} {...field} autoComplete="off" className="max-sm:w-[150px] sm:w-[170px] bg-inherit border-none focus-visible:outline-none pr-2.5" />
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                            />
                        </div>
                        <div className="createAccountFormContainer">
                            {/* PASSWORD */}
                            <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem className="mt-6 flex flex-col items-start gap-2">
                                <FormLabel className="text-base text-primary"> 
                                password 
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span>
                                </FormLabel>
                                <FormControl>
                                    <div className="flex items-center justify-between max-sm:w-[230px] sm:w-[250px] rounded-md bg-primary pr-5 py-2.5 pl-3">
                                        <input type={`${state.showPassword ? "text" : "password"}`} disabled={state.isLoading} {...field} placeholder="*********" autoComplete="new-password" className="bg-primary focus:outline-none focus-visible:ring-white border-none w-[90%] text-black text-sm" />
                                        {state.showPassword ? <button type="button" onClick={() => setState((values) => {
                                            return {...values, showPassword: false}
                                        })}> 
                                            <GoEye className="w-4 h-4 text-black" />
                                        </button> : <button type="button" onClick={() => setState((values) => {
                                            return {...values, showPassword: true}
                                        })}> 
                                            <GoEyeClosed className="w-4 h-4 text-black" />
                                        </button>
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                            />
                            {/* PASSWORD CONFIRM */}
                            <FormField
                            control={form.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                            <FormItem className="mt-6 flex flex-col items-start gap-2 max-md:mt-2">
                                <FormLabel className="text-base text-primary"> 
                                Confirm your password 
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span>
                                </FormLabel>
                                <FormControl>
                                    <div className="flex items-center justify-between max-sm:w-[230px] sm:w-[250px] rounded-md bg-primary pr-5 py-2.5 pl-3 text-black text-sm">
                                        <input type={`${state.showConfirmPassword ? "text" : "password"}`} disabled={state.isLoading} {...field} placeholder="*********" className="bg-primary focus:outline-none focus-visible:ring-white border-none w-[90%]" />
                                        {state.showConfirmPassword ? <button type="button" onClick={() => setState((values) => {
                                            return {...values, showConfirmPassword: false}
                                        })}> 
                                            <GoEye className="w-4 h-4 text-black" />
                                        </button> : <button type="button" onClick={() => setState((values) => {
                                            return {...values, showConfirmPassword: true}
                                        })}> 
                                            <GoEyeClosed className="w-4 h-4 text-black" />
                                        </button>
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                            />
                        </div>
                        <div className="createAccountFormContainer">
                            {/* CITY */}
                            <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                            <FormItem className="max-md:mt-6 md:mt-4 flex flex-col items-start gap-2">
                                <FormLabel className="text-base text-primary"> 
                                City
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span> 
                                </FormLabel>
                                <Select onValueChange= {field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger {...field} className="bg-primary max-sm:w-[230px] sm:w-[250px] px-3 py-2 text-black focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-white focus:ring-0">
                                            <SelectValue placeholder="Select City"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {cities.map((city, index) => {
                                            return (
                                                <div key={city}>
                                                    {index !== 0 && <SelectItem value={city} > {city} </SelectItem>}
                                                </div>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem> 
                            )} />
                            {/* PROFESSION */}
                            <FormField
                            control={form.control}
                            name="profession"
                            render={({ field }) => (
                            <FormItem className="mt-4 flex flex-col items-start gap-2">
                                <FormLabel className="text-base text-primary"> 
                                Profession
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span> 
                                </FormLabel>
                                <FormControl>
                                    <input type="text" disabled={state.isLoading} {...field} placeholder="Engineer" className="max-sm:w-[230px] sm:w-[250px] text-black text-sm px-3 py-2.5 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem> 
                            )} />
                        </div>
                        <div className="text-sm text-primary mt-6 mb-2"> Already have an account ? <Link href="/signin" className="text-button font-semibold ml-2"> Signin </Link> </div>
                        <div className="mt-5 block max-md:mr-9 md:mr-10">
                            <ReCAPTCHA
                                sitekey={SITE_KEY}
                                onChange={handleCaptchaChange}
                                onExpired={handleExpire}
                                size="normal"
                                style={{transform:"scale(0.76)", transformOrigin:"5 5", width: "250px", height: "25px",}}
                            />
                        </div>
                        <button type="submit" disabled={!isVerified || state.isLoading} className="bg-button max-sm:w-[230px] sm:w-full mt-16 h-auto px-4 py-2 rounded-md text-black font-semibold focus-visible:outline-none border-none disabled:cursor-not-allowed">
                            {state.isLoading ?
                            <ClipLoader
                            color="#ffffff"
                            loading={true}
                            size={24}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            />
                            : 
                            "Next"
                            }
                        </button>
                    </form>
                </Form>
            </div>}
            {state.secondStep && <SecondStepRegistration state={state} setState={setState} />}
            {state.thirdStep && <Preferences state={state} setState={setState} />}
        </div>
        </div>
    </section>
    )
}
