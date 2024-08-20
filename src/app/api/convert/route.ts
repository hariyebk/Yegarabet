import { NextResponse } from "next/server"
import sharp from "sharp"
import fetch from "node-fetch"
import { PDFDocument } from 'pdf-lib'
import fs from "fs"
import JSZip from "jszip"
import path from "path"
import { NextApiResponse } from "next"


const pdf2img = require('pdf-img-convert');

export async function POST(req: Request, res: NextApiResponse) {
    // check if the request method is POST
    if (req.method !== "POST") {
        return NextResponse.json({error: "Only POST requests allowed"}, {status: 405})
    }
    try{
        // Recieving the image 
        const formData = await req.formData()
        const file =  formData.get("file") as File
        const outputFormat = formData.get("output_format") as string
        const quality = parseInt(formData.get("quality") as string) || 85
        const url = formData.get("url") as string

        let inputBuffer

        if (file) {
            const buffer = await file.arrayBuffer()
            inputBuffer = Buffer.from(buffer)
        } 
        else if (url) {
            const response = await fetch(url)
            inputBuffer = Buffer.from(await response.arrayBuffer())
        } 

        if(!inputBuffer){
            return res.status(400).json({error: "No input file or URL provided"})
        }
        
        const isPdf = file && file.type === 'application/pdf'
        
        if(isPdf && outputFormat === 'pdf'){
            return NextResponse.json({error: "Unsupported image format selected."}, {status: 400})
        }
        // Converting a pdf file to an image
        if (isPdf){

            const baseDir = process.cwd();

            const tempDir = path.join(baseDir, 'tmp')
            fs.mkdirSync(tempDir, { recursive: true });

            const outputDir = path.join(tempDir, 'output');
            fs.mkdirSync(outputDir);  

            const pdfPath = path.join(tempDir, 'temp.pdf');
            fs.writeFileSync(pdfPath, inputBuffer);

            const pdfArray = await pdf2img.convert(pdfPath, {
                scale: 4.0
            });

            for (let i = 0; i < pdfArray.length; i++){
                const filePath = path.join(outputDir, `page-${i + 1}.${outputFormat}`);
                fs.writeFileSync(filePath, pdfArray[i]);
            }

            const zip = new JSZip();

            // Read the images from the output directory and add them to the zip
            const files = fs.readdirSync(outputDir);

            files.forEach(file => {
                const filePath = path.join(outputDir, file)
                const imageBuffer = fs.readFileSync(filePath);
                zip.file(file, imageBuffer)
            })
            
            // generate the zip file
            const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
            // Clean up the temp files
            fs.unlinkSync(pdfPath)
            files.forEach(file => fs.unlinkSync(path.join(outputDir, file)))
            fs.rmdirSync(outputDir)
            fs.rmdirSync(tempDir)
            
            // send the response
            return new NextResponse(zipBuffer, {
                headers: {
                    'Content-Type': 'application/zip',
                    'Content-Disposition': 'attachment; filename="pdf-images.zip"'
                }
            })
            
        }

        let convertedImageBuffer

        // Converting an image into a pdf
        if(!isPdf && outputFormat === 'pdf') {
            // changing the file buffer to an image buffer
            const image = await sharp(inputBuffer).png().toBuffer()
            // creating a pdf document
            const pdfDoc = await PDFDocument.create()
            // Adding a page to the pdf document
            const page = pdfDoc.addPage()
            // Embeding the image buffer into the pdf document
            const imageEmbed = await pdfDoc.embedPng(image)
            // Adjusting the size of the image on the pdf
            const { width, height } = imageEmbed.scale(1)
            page.setSize(width, height)
            page.drawImage(imageEmbed, {
                x: 0,
                y: 0,
                width,
                height,
            })
            convertedImageBuffer = Buffer.from(await pdfDoc.save())
            // send the response
            return new NextResponse(convertedImageBuffer, {
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="converted.pdf"'
                }
            })
        }
        // Converting an image into other formats (jpeg, webp, png and gif)
        else{
            switch (outputFormat){
                case 'jpeg':
                    convertedImageBuffer = await sharp(inputBuffer).jpeg({quality}).toBuffer()
                    break
                case 'webp':
                    convertedImageBuffer = await sharp(inputBuffer).webp({quality}).toBuffer()
                    break
                case 'png':
                    convertedImageBuffer = await sharp(inputBuffer).png({quality}).toBuffer()
                    break
                case 'gif':
                    convertedImageBuffer = await sharp(inputBuffer).gif().toBuffer()
                    break
                default:
                    return NextResponse.json({
                        error: "Unsupported output format"
                    })
            }
            // send the image as a response
            return new NextResponse(convertedImageBuffer, {
                status: 200,
                headers: {
                    'Content-Type': `image/${outputFormat}`,
                    'Content-Disposition': `attachment; filename=converted.${outputFormat}`
                }
            })
        }

    }
    catch(error: any){
        console.log("catch", error)
        return NextResponse.json({error: error?.message || "Internal server error"}, {status: 500})
    }
}