// import { UploadToCloudinary } from "../../../../actions";
import { NextResponse } from "next/server";
import CloudConvert from 'cloudconvert';
import stream from "stream";
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
        // const inputFormat = formData.get("input_format") as string
        const outputFormat = formData.get("output_format") as string
        const compression = formData.get("compression") as string
        const url = formData.get("url") as string
        const cloudConvert = new CloudConvert(process.env.CLOUD_CONVERT_API_KEY as string);
        let job
        if(!url){
            const file =  formData.get("file") as File
            job = await cloudConvert.jobs.create({
                "tasks": {
                    "import-1": {
                        "operation": "import/upload",
                    },
                    "task-1": {
                        "operation": "convert",
                        "input": "import-1",
                        "output_format": `${outputFormat}`,
                        "quality": `${compression ? parseInt(compression) : 85}`
                    },
                    "export-1": {
                        "operation": "export/url",
                        "input": "task-1",
                    }
                },
            })
            // getting the upload task
            const uploadTask = job.tasks.filter(task => task.name === 'import-1')[0]
            // Convert File to ReadableStream
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const readableStream = stream.Readable.from(buffer);
            // Upload the file
            await cloudConvert.tasks.upload(uploadTask, readableStream, file.name);
        }
        else{
            job = await cloudConvert.jobs.create({
                "tasks": {
                    "import-1": {
                        "operation": "import/url",
                        "url": `${url}`,
                    },
                    "task-1": {
                        "operation": "convert",
                        "input": "import-1",
                        "output_format": `${outputFormat}`,
                        "quality": `${compression ? parseInt(compression) : 85}`
                    },
                    "export-1": {
                        "operation": "export/url",
                        "input": "task-1",
                    }
                },
            })
        }
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
        console.log(`convert`, error)
        return NextResponse.json({
            error: error.message
        })
    }
}