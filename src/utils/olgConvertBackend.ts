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

/*

const baseDir = process.cwd()
            // Create a temporary directory
            const tempDir = path.join(baseDir, 'tmp', `pdf`)

            fs.mkdirSync(tempDir, { recursive: true });

            const pdfPath = path.join(tempDir, 'temp.pdf')
            const outputDir = path.join(tempDir, 'output_images')
            fs.mkdirSync(outputDir);
    
            fs.writeFileSync(pdfPath, inputBuffer);

            // Convert PDF to images and store them inside outputDir directory
            
            const document = await pdf(pdfPath, { scale: 3 })
            for(let i = 0; i < document.length; i++){
                const pageBuffer = await document.getPage(i+1)
                fs.writeFile(`${outputDir}/page-${i + 1}.${outputFormat}`, pageBuffer, function (error) {
                    if (error){ 
                        console.error("Error: " + error)
                    } 
                    else{
                        console.log(`File saved`)
                    }
                })
            }
            const zip = new JSZip();

            // Read the images from the output directory and add them to the zip
            const files = fs.readdirSync(outputDir);

            files.forEach(file => {
                const filePath = path.join(outputDir, file)
                const imageBuffer = fs.readFileSync(filePath)
                zip.file(file, imageBuffer)
            })
            
            // generate the zip file
            const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })

            // Clean up the temp files
            fs.unlinkSync(pdfPath)
            files.forEach(file => fs.unlinkSync(path.join(outputDir, file)))
            fs.rmdirSync(outputDir)
            fs.rmdirSync(tempDir)
*/