'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import Question from "@/components/small-peices/Question"
import { QuestionsSchema } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import ClipLoader from "react-spinners/ClipLoader"
import toast from "react-hot-toast"
import { ThirdStepUpdate } from "@/actions"
import { STATE } from "./SignupForm"
import { useRouter } from "next/navigation"

interface PreferencesProps {
    state: STATE,
    setState: React.Dispatch<React.SetStateAction<STATE>>
}

export default function Preferences({state, setState}: PreferencesProps) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {push} = useRouter()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    const form = useForm<z.infer<typeof QuestionsSchema>>({
        resolver: zodResolver(QuestionsSchema),
        defaultValues: {
            gender: {
                question: "Preferred roommate gender ?",
                answer: ""
            },
            age: {
                question: "Preferred roommate age ?",
                answer: ""
            },
            guest: {
                question: "Would it okay if your roommate brings someone home ?",
                answer: ""
            },
            pets: {
                question: "Are you comfortable with your roommate having pets ?",
                answer: ""
            },
            drugs: {
                question: "Are you okay with a roommate who smokes or drinks ?",
                answer: ""
            },
            occupation: {
                question: "What type of roommate do you prefer ?",
                answer: ""
            },
            cleanlines: {
                question: "How important is cleanliness to you in a roommate ?",
                answer: ""
            },
            lateNight: {
                question: "Is it okay if your roommate comes home late at night ?",
                answer: ""
            }
        },
    })

    async function onSubmit(values: z.infer<typeof  QuestionsSchema>){
        const data =  Object.values(values)
        setIsLoading(true)
        try{
            const result = await ThirdStepUpdate({
                preferences: data,
                userId: state.userId
            })
            if(result?.error){
                return toast.error(result.error)
            }
            else{
                setIsLoading(false)
                toast.success("Registration complete")
                push("/signin")
            }
        }
        catch(error: any){
            console.log(error)
            setIsLoading(false)
            toast.error(error.message)
        }
    }

    return (
        <section className="flex flex-col flex-1">
            <h3 className="max-sm:text-base sm:text-xl text-primary max-sm:mx-3 mt-3 flex flex-wrap max-sm:leading-7 justify-center"> Tell us about your roommate preference </h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-sm:ml-8 max-sm:mr-4 sm:ml-20 py-3">
                    {/* GENDER PREFERENCE */}
                    <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-2">
                        <FormControl>
                            <Question field={field.value} fieldChange={field.onChange} answers={["Male", "Female", "It doesn't matter"]}  />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                    )}
                    />
                    {/* AGE PREFERENCE */}
                    <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-2">
                        <FormControl>
                            <Question field={field.value} fieldChange={field.onChange} answers={["18-22", "23-27", "28-32", "33-37", "37+"]}  />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                    )}
                    />
                    {/* GUESTS PREFERENCE */}
                    <FormField
                    control={form.control}
                    name="guest"
                    render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-2">
                        <FormControl>
                            <Question field={field.value} fieldChange={field.onChange} answers={["Yes", "No", "Depends on the situation"]}  />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                    )}
                    />
                    {/* PETS PREFERENCE */}
                    <FormField
                    control={form.control}
                    name="pets"
                    render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-2">
                        <FormControl>
                            <Question field={field.value} fieldChange={field.onChange} answers={ ["Yes", "No", "Depends on the pet"]}  />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                    )}
                    />
                    {/* DRUGS */}
                    <FormField
                    control={form.control}
                    name="drugs"
                    render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-2">
                        <FormControl>
                            <Question field={field.value} fieldChange={field.onChange} answers={["Yes", "No", "Occasional use is okay"]}  />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                    )}
                    />
                    {/* OCCUPATION */}
                    <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-2">
                        <FormControl>
                            <Question field={field.value} fieldChange={field.onChange} answers={["Student", "Worker", "It doesn't matter"]}  />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                    )}
                    />
                    {/* CLEANLINES */}
                    <FormField
                    control={form.control}
                    name="cleanlines"
                    render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-2">
                        <FormControl>
                            <Question field={field.value} fieldChange={field.onChange} answers={["Very important", "Somewhat important", "Not very important"]}  />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                    )}
                    />
                    {/* LATE NIGHT */}
                    <FormField
                    control={form.control}
                    name="lateNight"
                    render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-2">
                        <FormControl>
                            <Question field={field.value} fieldChange={field.onChange} answers={["Yes", "No", "Occasional is okay"]}  />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                    )}
                    />
                    <button type="submit" disabled={isLoading} className="w-[200px] h-[45px] mt-10 bg-button rounded-md flex items-center justify-center text-black focus-visible:outline-none disabled:cursor-not-allowed">
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
