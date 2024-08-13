'use server'

import { SiginFormSchema, SignupFormSchema } from "@/lib/validation"
import { db } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { CheckIfPasswordsMatch, HashPassword, encrypt } from "@/utils"
import { cloudinary } from "../lib/Cloudinary/config"
import {Readable} from "stream"

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
        const user = await db.user.findFirst({
            where: {
                email
            }
        })
        if(!user){
            return {
                error: "Invalid email or password"
            }
        }
        const passwordsMatch = await CheckIfPasswordsMatch(password, user.hashedPassword)
        if(!passwordsMatch){
            return {
                error: "Invalid email or password"
            }
        }
        // Generating a new jwt token and setting it as a cookie
        await encrypt({email: user.email, name: user.firstName})
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
        const isThereUser = await db.user.findFirst({
            where: {
                email
            }
        })
        if(isThereUser){
            return {
                error: "User with the provided email already exists"
            }
        }
        const hashedPassword = await HashPassword(password)
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
export async function GetCurrentUser(){
    
    
}
export async function UploadToCloudinary(formData: FormData) {
    try{
        const file =  formData.get("file") as File
        const fileBuffer = await file.arrayBuffer()
        const mimeType = file.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");
        const fileURI = "data:" + mimeType + ";" + encoding + "," + base64Data;
        const result = await cloudinary.uploader.upload(fileURI, {
            invalidate: true,
            resource_type: "auto",
            filename_override: file.name,
            folder: "yegarabet",
            use_filename: true,
        })
        // If the image uploading process failed
        if(!result.secure_url) {
            return {
                error: "failed to upload to cloudinary"
            }
        }
        return {
            imageUrl: result.secure_url
        }
    }
    catch(error: any){
        console.log(`cloudinary`, error)
        return {
            error: "Something went wrong"
        }
    }
}
// export async function UploadPdfToCloudinary(formData: FormData){
//     const file = formData.get("file") as File;
//     if (!file) {
//         return { error: "No file provided" };
//     }
//     try {
//         const buffer = Buffer.from(await file.arrayBuffer());
//         const stream = Readable.from(buffer);

//         return new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream({
//                 resource_type: "auto",
//                 filename_override: file.name,
//                 folder: "yegarabet",
//                 use_filename: true,
//             }, (error, result) => {
//             if (error) {
//                 reject({ error: "Failed to upload to Cloudinary" });
//             } 
//             else if (result && result.secure_url) {
//                 resolve({ imageUrl: result.secure_url });
//             } 
//             else {
//                 reject({ error: "Failed to get secure URL from Cloudinary" });
//             }
//             }
//         );

//         stream.pipe(uploadStream);
//         });
//     } catch (error) {
//         console.error("Error during file upload:", error);
//         return { error: "An error occurred during file upload" };
//     }
// }