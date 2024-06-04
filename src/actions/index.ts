'use server'

import { SiginFormSchema, SignupFormSchema } from "@/lib/validation"
import { db } from "@/lib/db"
import bcrypt from "bcrypt"
import {cookies} from "next/headers"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { encrypt } from "@/utils"

interface SecondStepActionProps {
    socialLinks: {type: string, link: string}[],
    numberOfRoommatesNeeded: number | null ,
    hasRentedRoom: boolean,
    peopleLivingWith: number | null,
    currentRentPrice: number | null,
    budget: string,
    image: string | null,
    description: string
    userId: string
}
interface ThirdStepUpdateActionProps {
    preferences: {question: string, answer: string}[], 
    userId: string
}

export async function Login(values: z.infer<typeof SiginFormSchema>){
    const {email, password} = values
    try{
        // Check if the email exists first
        const user = await db.user.findUnique({
            where: {
                email
            }
        })
        if(!user){
            return {
                error: "Invalid email or password"
            }
        }
        const passwordsMatch = await bcrypt.compare(password, user.hashedPassword)
        if(!passwordsMatch){
            return {
                error: "Invalid email or password"
            }
        }
        const session = await encrypt({email: user.email, name: user.firstName})

        cookies().set({
            name: "session",
            value: session,
            httpOnly: true,
            sameSite: "lax"
        })
        // returning the signed in user to the client
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.image,
        }
    }
    catch(error: any){
        return {
            error: error.message
        }
    }
}
export async function RegisterUser(values: z.infer<typeof SignupFormSchema>){

    const {firstName, lastName, email, gender, birthDate, city, profession, password, phoneNumber} = values
    // Check if the email doesn't exist already
    try{
        const isThereUser = await db.user.findUnique({
            where: {
                email
            }
        })
        if(isThereUser){
            return {
                error: "User with the provided email already exists"
            }
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        // create the new user
        const newUser = await db.user.create({
            data: {
                firstName,
                lastName,
                email,
                gender,
                birthDate,
                city,
                phoneNumber,
                profession,
                hashedPassword,
                socialLinks: [],
                preferences: [],
            }
        })

        return {
            userId: newUser.id
        }
    }
    catch(error: any){
        return {
            error: error.message
        }
    }
}
export async function SecondStepUpdate(values: SecondStepActionProps){

    const {userId, socialLinks, numberOfRoommatesNeeded, hasRentedRoom, peopleLivingWith, currentRentPrice, budget, image, description} = values
    try{
        if(!userId){
            return {
                error: "Not Authorized"
            }
        }
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                socialLinks,
                numberOfRoommatesNeeded,
                hasRentedRoom,
                peopleLivingWith,
                currentRentPrice,
                budget,
                image,
                description
            }
        })

        return {
            message: "successfull"
        }
    }
    catch(error: any){
        return {
            error: error.message
        }
    }
}
export async function ThirdStepUpdate({preferences, userId}: ThirdStepUpdateActionProps){
    if(!userId){
        return {
            error: "Not Authorized"
        }
    }
    try{
        // updating the users preferences array and marking the user as completing the resgiration process
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                preferences,
                completedRegistration: true
            }
        })
    }
    catch(error: any){
        return {
            error: error.message
        }
    }
    // revalidate the find-roommates page to include the current user
    revalidatePath("/find-roommates")
}