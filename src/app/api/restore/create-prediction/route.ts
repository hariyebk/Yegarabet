import { UploadToCloudinary } from "@/actions";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // check if the request method is POST
    if (req.method !== "POST") {
        return NextResponse.json({
            error: "Only POST requests allowed"
        })
    }
    try{
        // Recieving the image 
        const formData = await req.formData()
        const upscale = formData.get("upscale") as string
        const fidelity = formData.get("fidelity") as string
        const enhance = formData.get("enhance") as string
        const upsample = formData.get("upsample") as string
        const token = formData.get("token")
        const REPLICATE_API_TOKEN = token ? token : process.env.REPLICATE_API_TOKEN as string
        console.log(fidelity, upscale, upsample, enhance)
        const upscaleValue = Boolean(upscale) ? parseInt(upscale) : 2
        const fidelityValue = Boolean(fidelity) ? parseInt(fidelity) : 0.5
        const enhanceValue = enhance ? enhance === "true" ? true : false : true
        const upsampleValue = upsample ? upsample === "true" ? true : false : true
        // Host the image on cloudinary first
        const hostedImageUrl = await UploadToCloudinary(formData)
        if(hostedImageUrl.error){
            return NextResponse.json({
                error: hostedImageUrl.error
            })
        }
        // create a prediction
        const response = await axios.post("https://api.replicate.com/v1/predictions",
        {
            "version": "7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
            "input": {
                "image": `${hostedImageUrl.imageUrl}`,
                "upscale": upscaleValue,
                "face_upsample": upsampleValue,
                "background_enhance": enhanceValue,
                "codeformer_fidelity": fidelityValue
            }
        },
        {
            headers: {
                "Authorization": `Bearer ${REPLICATE_API_TOKEN}`,
                "Content-Type": "application/json"
            }
        })

        const data = response.data
        const predictionId = data.id
        // send the results to the user
        return NextResponse.json({
            predictionId
        })
    }
    catch(error: any){
        console.log(error)
        return NextResponse.json({
            error: error.message
        })
    }
}