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
        const outputs = data.output
        // If we didn't get an output
        if(outputs.length === 0){
            return NextResponse.json({
                error: "Prediction has failed"
            })
        }
        // send the results to the user
        return NextResponse.json({
            outputs
        })
    }
    catch(error: any){
        return NextResponse.json({ 
            error: "slow internet connection."
        })
    }
}