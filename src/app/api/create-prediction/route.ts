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
        const prompt = formData.get("prompt")
        const negativePrompt = formData.get("negative_prompt")
        const width = formData.get("width") as string
        const height = formData.get("height") as string
        const steps = formData.get("steps") as string
        const seed = formData.get("seed") as string
        const strength = formData.get("strength") as string
        const token = formData.get("token")
        const REPLICATE_API_TOKEN = token ? token : process.env.REPLICATE_API_TOKEN as string
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
            "version": "764d4827ea159608a07cdde8ddf1c6000019627515eb02b6b449695fd547e5ef",
            "input": {
                "image": `${hostedImageUrl.imageUrl}`,
                "prompt": `${prompt}`,
                "negative_prompt": negativePrompt,
                "prompt_strength": parseFloat(strength),
                "width": parseInt(width),
                "height": parseInt(height),
                "steps": parseInt(steps),
                "seed": parseInt(seed),
                "instant_id_strength": 0.7
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
        return NextResponse.json({
            error: error.message
        })
    }
}