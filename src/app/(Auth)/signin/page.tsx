"use client"

import React, { useRef, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast"
import { SiginFormSchema } from "@/lib/validation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ClipLoader from "react-spinners/ClipLoader";
import ReCAPTCHA from "react-google-recaptcha";
import { Login} from "@/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Signin() {

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {push} = useRouter()
    const recaptchaRef = useRef<ReCAPTCHA>(null)
    const [isVerified, setIsVerified] = useState<boolean>(false)
    const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
    
    const form = useForm<z.infer<typeof SiginFormSchema>>({
        resolver: zodResolver(SiginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof SiginFormSchema>){
        setIsLoading(true)
        try{
            const result = await Login(values)
            if(result.error){
                return toast.error(result.error)
            }
            //TODO: UPDATE THE GLOBAL STATE
            toast.success("You have Logged in")
            push("/find-roommates")
        }
        catch(error: any){
            console.log(error)
            return toast.error(error.message || "Something went wrong")
        }
        finally{
            setIsLoading(false)
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
        } 
        catch (e: any) {
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
        <section className="min-h-screen mt-28 mb-20">
            <div className="flex items-center justify-center max-sm:mx-5">
            <div className="mt-7 max-sm:w-full sm:w-[550px] md:w-[630px] max-sm:px-6 h-auto bg-card shadow-xl max-md:rounded-lg rounded-xl pt-10 pb-20 md:pl-5">
                <div className="flex flex-col flex-1 items-center">
                    <h3 className="max-sm:text-lg sm:text-xl md:text-2xl text-primary font-palanquin uppercase"> Sign in to your Account </h3>
                    <p className="text-sm text-secondary mt-3 mb-2"> Welcome back. Please enter your details </p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center  gap-3">
                            {/* EMAIL */}
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem className="mt-4 flex flex-col items-start gap-3">
                                <FormLabel className="max-sm:text-sm sm:text-base text-primary"> Email address </FormLabel>
                                <FormControl>
                                    <input type="text" disabled={isLoading} {...field} placeholder="mamo@example.com" className="max-sm:w-[250px] sm:w-[350px] text-black text-sm px-3 py-3 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white" />
                                </FormControl>
                                <FormMessage className="-pt-5 formError" />
                            </FormItem>
                            )}
                            />
                            {/* PASSWORD */}
                            <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem className="mt-4 flex flex-col items-start gap-3" >
                                <FormLabel className="max-sm:text-sm sm:text-base text-primary"> Password </FormLabel>
                                <FormControl>
                                    <div className="flex items-center justify-between max-sm:w-[250px] sm:w-[350px] rounded-md bg-primary pr-5 py-3 pl-3">
                                        <input type={`${showPassword ? "text" : "password"}`} disabled={isLoading} {...field} placeholder="*********" className="bg-primary focus:outline-none focus-visible:ring-white border-none w-[90%] text-black text-sm" />
                                        {showPassword ? <button type="button" onClick={() => setShowPassword(false)}> 
                                            <GoEye className="w-4 h-4 text-black" />
                                        </button> : <button type="button" onClick={() => setShowPassword(true)}> 
                                            <GoEyeClosed className="w-4 h-4 text-black" />
                                        </button>
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage className="-pt-5 formError" />
                            </FormItem>
                            )}
                            />
                            <div className="mt-8 block">
                                <ReCAPTCHA
                                    sitekey={SITE_KEY}
                                    onChange={handleCaptchaChange}
                                    onExpired={handleExpire}
                                    size="normal"
                                    style={{transform:"scale(0.82)", transformOrigin:"0 0", width: "250px", height: "25px",}}
                                />
                            </div>
                            <button type="submit" disabled={!isVerified} className="mt-16 max-sm:w-[250px] sm:w-[350px] bg-button px-5 py-2 rounded-sm text-black uppercase font-semibold disabled:cursor-not-allowed"> {isLoading ? (
                                <ClipLoader
                                color="#ffffff"
                                loading={true}
                                size={24}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                                />
                            ) : "Sign in" } </button>
                        </form>
                    </Form>
                    <div>
                        {/* <div className="mt-10 max-md:mt-14 flex items-center gap-3">
                            <hr className="border border-t-slate-700 max-sm:w-[50px] sm:w-[90px]" />
                            <p className="text-primary text-base"> or countinue with </p>
                            <hr className="border border-t-gray-400 max-sm:w-[50px] sm:w-[100px]" />
                        </div> */}
                        {/* <div className="mt-10 flex items-start justify-center gap-20">
                            <button onClick={() => handleSocialLogin("github")} disabled={isLoading} className="px-10 py-2 rounded-md border border-main disabled:cursor-not-allowed">
                                <BsLinkedin className="w-6 h-6 text-blue-500" />
                            </button>
                            <button onClick={() => handleSocialLogin("google")} disabled={isLoading} className="px-10 max-md:px-10 py-2 rounded-md border border-main disabled:cursor-not-allowed">
                                <FcGoogle className="w-6 h-6" />
                            </button>
                        </div> */}
                        <div className="mt-10 flex flex-wrap max-sm:leading-7 items-center justify-center gap-2 text-base text-primary">
                            <p> Don't have an account ? </p>
                            <Link href="/signup" className="text-button font-semibold"> Sign Up </Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}