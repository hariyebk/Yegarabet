import { UploadToCloudinary } from "@/actions";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // check if the request method is POST
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ message: "Only POST requests allowed" }),
        { status: 405 },
        );
    }
    try{
        // Recieving the image 
        const formData = await req.formData()
        const prompt = formData.get("prompt")
        const token = formData.get("token")
        const REPLICATE_API_TOKEN = token ? token : process.env.REPLICATE_API_TOKEN as string
        const hostedImageUrl = await UploadToCloudinary(formData)
        if(hostedImageUrl.error){
            return new Response(JSON.stringify({ message: hostedImageUrl.error }), {
                status: 500,
            });
        }
        // create a prediction
        const response = await axios.post("https://api.replicate.com/v1/predictions",
        {
            "version": "764d4827ea159608a07cdde8ddf1c6000019627515eb02b6b449695fd547e5ef",
            "input": {
                "image": `${hostedImageUrl.imageUrl}`,
                "prompt": `${prompt}`,
                "prompt_strength": 4.5,
                "instant_id_strength": 0.7
            }
        },
        {
            headers: {
                "Authorization": `Bearer ${REPLICATE_API_TOKEN}`,
                "Content-Type": "application/json"
            }
        })
        const predictionId = response.data.id
        // If there is no prediction created
        if(!predictionId){
            return new Response(JSON.stringify({ message: "Failed to verity" }), {
                status: 401,
            });
        }
        // A function to delay the execution because we need to Wait for the model to finish processing the image, then making a request to get the results
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        // wait for 35 seconds
        await delay(35000)
        // get the prediction result
        const predictionResult = await axios.get(`https://api.replicate.com/v1/predictions/${predictionId}`, {
            headers: {
                "Authorization": `Bearer ${REPLICATE_API_TOKEN}`,
            }
        })
        const output = predictionResult.data.output
        // If we didn't get an output
        if(!output || output.length === 0){
            return new Response(JSON.stringify({ message: "Prediction has failed" }), {
                status: 500,
            });
        }
        // send the results to the user
        return NextResponse.json({
            message: "success",
            outputs: output
        })
    }
    catch(error: any){
        return new Response(JSON.stringify({ message: error.message || "Internal Server Error" }), {
            status: 500,
        });
    }
}