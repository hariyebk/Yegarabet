"use client"

import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { FiMessageCircle } from "react-icons/fi";
import { VscGithubInverted } from "react-icons/vsc";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast"
import { SiginFormSchema } from "@/lib/validation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ClipLoader from "react-spinners/ClipLoader";
import { Login, SocialLogin } from "@/actions";
import Link from "next/link";

export default function Signin() {

    const [showPassword, setShowPassword] = useState(false)
    const [emailMessage, setEmailMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)

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
            if(result?.error){
                return toast.error(result.error)
            }
            toast.success("You have Logged in")
        }
        catch(error: any){
            console.log(error)
            toast.error(error)
        }
        finally{
            setIsLoading(false)
        }
    }
    async function handleSocialLogin(action: string){
        try{
            await SocialLogin(action)
        }
        catch(error: any){
            toast.error(error || "something went wrong")
        } 
    }


    return (
        <section className="min-h-screen mt-28 mb-14">
            <div className="flex items-center justify-center container">
            <div className="mt-7 w-[630px] max-sm:w-[350px] h-auto bg-card shadow-xl max-md:rounded-lg rounded-xl pt-10 pb-20 pl-10">
                <div className="flex flex-col flex-1 items-center">
                    <h3 className="text-2xl max-md:text-xl text-primary font-palanquin uppercase"> Sign in to your Account </h3>
                    <p className="text-sm text-secondary mt-3 mb-2"> Welcome back. Please enter your details </p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center  gap-3">
                            {/* EMAIL */}
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem className="mt-4 flex flex-col items-start gap-3">
                                <FormLabel className="text-base text-primary"> Email address </FormLabel>
                                <FormControl>
                                    <input type="text" disabled={isLoading} {...field} placeholder="mamo@example.com" className="w-[350px] max-md:w-[270px] text-black text-sm px-3 py-3 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white" />
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
                                <FormLabel className="text-base text-primary"> Password </FormLabel>
                                <FormControl>
                                    <div className="flex items-center justify-between w-[350px] max-md:w-[270px] rounded-md bg-primary pr-5 py-3 pl-3">
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
                            {emailMessage && (
                                <div className="mt-5 mr-16 bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-black">
                                    <FiMessageCircle className="h-4 w-4 text-emerald-500" />
                                    <p>{emailMessage}</p>
                                </div>
                            )}
                            <button type="submit" className="mt-10 w-[350px] max-md:w-[270px] bg-button px-5 py-2 rounded-sm text-black uppercase font-semibold"> {isLoading ? (
                                <ClipLoader
                                color="#ffffff"
                                loading={true}
                                size={24}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                                className="mt-2"
                                />
                            ) : "Sign in" } </button>
                        </form>
                    </Form>
                    <div className="">
                        <div className="mt-10 max-md:mt-14 flex items-center gap-3">
                            <hr className="border border-t-slate-700 w-[90px] max-md:w-[60px]" />
                            <p className="text-primary text-base"> or countinue with </p>
                            <hr className="border border-t-gray-400 w-[100px] max-md:w-[60px]" />
                        </div>
                        <div className="mt-10 flex items-start gap-20">
                            <button onClick={() => handleSocialLogin("github")} disabled={isLoading} className="px-16 max-md:px-10 py-2 rounded-md border border-main disabled:cursor-not-allowed">
                                <VscGithubInverted className="w-6 h-6" />
                            </button>
                            <button onClick={() => handleSocialLogin("google")} disabled={isLoading} className="px-10 max-md:px-10 py-2 rounded-md border border-main disabled:cursor-not-allowed">
                                <FcGoogle className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="mt-10 flex items-center justify-center gap-2 text-base text-primary">
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