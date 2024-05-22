'use server'

import { SiginFormSchema } from "@/lib/validation"
import { revalidatePath } from "next/cache"
import { z } from "zod"


export async function Login(values: z.infer<typeof SiginFormSchema>){
    const validatedFields = SiginFormSchema.safeParse(values)
    if(!validatedFields.success){
        return {error: "Invalid inputs detected"}
    }
    const {email, password} = validatedFields.data
    try{
        // await signIn(CREDENTIALS_PROVIDER, {
        //     email,
        //     password,
        //     redirectTo: DEFAULT_REDIRECT_ROUTE
        // })
    }
    catch(error: any){
        // if(error instanceof AuthError){
        //     if(error.type === "CredentialsSignin"){
        //         return {error: "Invalid Credentials"}
        //     }
        // }
        throw error
    }
}

export async function SocialLogin(action: string){
    // await signIn(action, {redirectTo: DEFAULT_REDIRECT_ROUTE})
    // revalidatePath("/")
}