'use client'

import { SignupFormSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useState } from "react"
import Link from "next/link"
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "../ui/select"
import { GoEye, GoEyeClosed } from "react-icons/go"
import { cities } from "@/constants"



export default function SignupForm() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [currentState, setCurrentState] = useState<number>(1)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [confirmShowPassword, setConfirmShowPassword] = useState<boolean>(false)


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
            phoneNumber: `0${values.phoneNumber}`
        }
        setIsLoading(true)
        try{

        }
        catch(error: any){

        }
        finally{
            setIsLoading(false)
        }
    }


    return (
    <section className="ml-10">
        <header>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css" />
        </header>
        <div className="flex items-center justify-center">
        <div className="mt-7 w-[700px] max-sm:w-[350px] h-auto bg-card shadow-xl max-md:rounded-lg rounded-xl pt-10 pb-20">
            <div className="flex flex-col flex-1 items-center">
                <h3 className="text-2xl max-md:text-xl text-primary font-palanquin uppercase"> Create your Account </h3>
                <p className="text-sm text-secondary mt-3 mb-2"> Let's get you started. Please enter your details </p>
                {currentState > 1 && <div className="mt-4 w-full flex items-start justify-start">
                    <button onClick={() => setCurrentState((state) => state - 1)}>
                        <p className="text-button font-semibold"> Go Back </p>
                    </button>
                </div>}
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
                                    <input type="text" disabled={isLoading} {...field} placeholder="abebe" className="max-sm:w-[200px] sm:w-[250px] text-black text-sm px-3 py-2.5 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white" />
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
                            <FormItem className="flex flex-col items-start gap-2">
                                <FormLabel className="text-base text-primary"> 
                                Last name 
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span>
                                </FormLabel>
                                <FormControl>
                                    <input type="text" disabled={isLoading} {...field} placeholder="balcha" className="max-sm:w-[200px] sm:w-[250px] text-black text-sm px-3 py-2.5 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white" />
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
                            <FormItem className="mt-4 flex flex-col items-start gap-2">
                                <FormLabel className="text-base text-primary"> 
                                Email
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span> 
                                </FormLabel>
                                <FormControl>
                                    <input type="text" disabled={isLoading} {...field} placeholder="abebebaclha@gmail.com" className="max-sm:w-[200px] sm:w-[250px] text-black text-sm px-3 py-3 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white" />
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
                            <FormItem className="mt-4 flex flex-col items-start gap-2">
                                <FormLabel className="text-base text-primary"> 
                                Gender
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span> 
                                </FormLabel>
                                <Select onValueChange= {field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger {...field} className="bg-primary max-sm:w-[200px] sm:w-[250px] px-3 py-2 text-black focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-white focus:ring-0">
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
                                    <input type="date" disabled={isLoading} {...field} placeholder="abebe" className="max-sm:w-[200px] sm:w-[250px]  text-black text-sm px-3 py-2.5 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white" />
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
                            <FormItem className="mt-6 flex flex-col items-start gap-2">
                                <FormLabel className="text-base text-primary">
                                Phone number 
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span>
                                </FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-2 max-sm:w-[200px] sm:w-[250px] text-black text-sm px-3 py-2.5 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white">
                                        <div className="flex items-center gap-2">
                                            <div className="block">
                                                <span className="fi fi-et" />
                                            </div>
                                            <p className="text-sm"> +251 </p>
                                        </div>
                                        <input type="text" disabled={isLoading} {...field} autoComplete="off" className="max-sm:w-[180px] sm:w-[230px] bg-inherit border-none focus-visible:outline-none" />
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
                                    <div className="flex items-center justify-between max-sm:w-[200px] sm:w-[250px] rounded-md bg-primary pr-5 py-2.5 pl-3">
                                        <input type={`${showPassword ? "text" : "password"}`} disabled={isLoading} {...field} placeholder="*********" autoComplete="new-password" className="bg-primary focus:outline-none focus-visible:ring-white border-none w-[90%] text-black text-sm" />
                                        {showPassword ? <button type="button" onClick={() => setShowPassword(false)}> 
                                            <GoEye className="w-4 h-4 text-black" />
                                        </button> : <button type="button" onClick={() => setShowPassword(true)}> 
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
                            <FormItem className="mt-6 flex flex-col items-start gap-2">
                                <FormLabel className="text-base text-primary"> 
                                Confirm your password 
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span>
                                </FormLabel>
                                <FormControl>
                                    <div className="flex items-center justify-between max-sm:w-[200px] sm:w-[250px] rounded-md bg-primary pr-5 py-2.5 pl-3 text-black text-sm">
                                        <input type={`${confirmShowPassword ? "text" : "password"}`} disabled={isLoading} {...field} placeholder="*********" className="bg-primary focus:outline-none focus-visible:ring-white border-none w-[90%]" />
                                        {confirmShowPassword ? <button type="button" onClick={() => setConfirmShowPassword(false)}> 
                                            <GoEye className="w-4 h-4 text-black" />
                                        </button> : <button type="button" onClick={() => setConfirmShowPassword(true)}> 
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
                            <FormItem className="mt-4 flex flex-col items-start gap-2">
                                <FormLabel className="text-base text-primary"> 
                                City
                                <span className="text-sm text-red-500 ml-1 pb-2"> * </span> 
                                </FormLabel>
                                <Select onValueChange= {field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger {...field} className="bg-primary max-sm:w-[200px] sm:w-[250px] px-3 py-2 text-black focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-white focus:ring-0">
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
                                    <input type="text" disabled={isLoading} {...field} placeholder="Engineer" className="max-sm:w-[200px] sm:w-[250px] text-black text-sm px-3 py-2.5 rounded-md bg-primary focus-visible:outline-none focus-visible:ring-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem> 
                            )} />
                        </div>
                        <div className="text-sm text-primary mt-6 mb-2"> Already have an account ? <Link href="/signin" className="text-button font-semibold"> Signin </Link> </div>
                        <button type="submit" className="bg-button w-full mt-3 h-auto px-4 py-2 rounded-md text-black font-semibold focus-visible:outline-none border-none">
                            Next
                        </button>
                    </form>
                </Form>
            </div>
        </div>
        </div>
    </section>
    )
}
