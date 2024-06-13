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
        const data = await req.json()
        const {token} = data
        // check if token is valid
        const response = await axios.post("https://api.replicate.com/v1/account",
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })

        if(response.data.title){
            return NextResponse.json({
                error: "Invalid API token"
            })
        }
    }
    catch(error: any){
        return NextResponse.json({
            error: "Invalid API token"
        })
    }
}