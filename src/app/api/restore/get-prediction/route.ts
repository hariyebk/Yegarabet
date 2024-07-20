import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // check if the request method is POST
    if (req.method !== "POST") {
        return NextResponse.json({
            error: "Only POST requests allowed"
        })
    }
     // parsing the request body
    const data = await req.json()
    const {predictionId, token} = data
    const REPLICATE_API_TOKEN = token ? token : process.env.REPLICATE_API_TOKEN as string

    try{
        const predictionResult = await axios.get(`https://api.replicate.com/v1/predictions/${predictionId}`, {
            headers: {
                "Authorization": `Bearer ${REPLICATE_API_TOKEN}`,
            }
        })

        const data = predictionResult.data
        const output = data.output
        // If we didn't get an output
        if(!output){
            return NextResponse.json({
                error: "Prediction has failed. try again"
            })
        }
        // send the result to the user
        return NextResponse.json({
            output
        })
    }
    catch(error: any){
        return NextResponse.json({ 
            error: error.message || "slow internet connection."
        })
    }
}