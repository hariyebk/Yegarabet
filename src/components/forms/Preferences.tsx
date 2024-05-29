'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import Question from "@/components/small-peices/Question"
import { QuestionsSchema } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import ClipLoader from "react-spinners/ClipLoader"


export default function Preferences() {

    const [isLoading, setIsLoading] = useState<boolean>(false)

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
        const data = [values]
    }

    return (
        <section className="flex flex-col flex-1">
            <h3 className="text-xl text-primary mt-3 flex justify-center"> Tell us about your roommate preference </h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="px-20 py-3">
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
                    <button type="submit" className="w-[200px] mt-10 bg-button rounded-md px-4 py-2 text-black focus-visible:outline-none">
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
