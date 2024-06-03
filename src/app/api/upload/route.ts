import { cloudinary } from "@/lib/Cloudinary/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ message: "Only POST requests allowed" }),
        { status: 405 },
        );
    }
    try{
        // Recieving the image 
        const formData = await req.formData()
        const file =  formData.get("file") as File
        const fileBuffer = await file.arrayBuffer()
        const mimeType = file.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");
        // constructing the fileURI for Cloudinary
        const fileURI = "data:" + mimeType + ";" + encoding + "," + base64Data;
        // Uploading our image into cloudinary
        const result = await cloudinary.uploader.upload(fileURI, {
            invalidate: true,
            resource_type: "auto",
            filename_override: file.name,
            folder: "yegarabet",
            use_filename: true,
        })
        // If we successfully uploaded the image to cloudinary we return the imageUrl back to the client
        if(result.secure_url){
            return NextResponse.json({
                message: "success",
                imageUrl: result.secure_url
            })
        }
        else{
            return NextResponse.json({
                message: "failed"
            })
        }
    }
    catch(error){
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
        });
    }
}