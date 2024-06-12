import { UploadToCloudinary } from "@/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ message: "Only POST requests allowed" }),
        { status: 405 },
        );
    }
    try{
        // Recieving the image as a formData
        const formData = await req.formData()
        const hostedImageUrl = await UploadToCloudinary(formData)
        return NextResponse.json({
            message: "success",
            imageUrl: hostedImageUrl
        })
    }
    catch(error){
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
        });
    }
}