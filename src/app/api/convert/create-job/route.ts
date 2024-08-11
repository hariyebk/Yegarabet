import { UploadToCloudinary } from "../../../../actions";
import axios from "axios";
import { NextResponse } from "next/server";
import CloudConvert from 'cloudconvert';

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
        const outputFormat = formData.get("output_format") as string
        const compression = formData.get("compression") as string
        const url = formData.get("url") as string
        const cloudConvert = new CloudConvert(process.env.CLOUD_CONVERT_API_KEY as string);
        let imageURL
        if(!url){
            // Host the image on cloudinary
            const hostedImageUrl = await UploadToCloudinary(formData)
            if(hostedImageUrl.error){
                return NextResponse.json({
                    error: hostedImageUrl.error
                })
            }
            imageURL = hostedImageUrl.imageUrl
        }
        else{
            imageURL = url
        }
        // starting a job
        let job = await cloudConvert.jobs.create({
            "tasks": {
                    "import-1": {
                        "operation": "import/url",
                        "url": `${imageURL}`,
                    },
                    "task-1": {
                        "operation": "convert",
                        "input": "import-1",
                        "output_format": `${outputFormat}`,
                        "quality": `${compression ? parseInt(compression) : 60}`
                    },
                    "export-1": {
                        "operation": "export/url",
                        "input": "task-1",
                    }
                },
        })
        // wait for job completion
        job = await cloudConvert.jobs.wait(job.id)
        // retrive the result
        const file = cloudConvert.jobs.getExportUrls(job)[0]
        // send the results to the user
        return NextResponse.json({
            newfile: file
        })
    }
    catch(error: any){
        console.log(error)
        return NextResponse.json({
            error: error.message
        })
    }
}