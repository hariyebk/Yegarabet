'use client'

import Image from "next/image";
import { useCallback, useEffect, useState } from "react"
import { FileWithPath, useDropzone } from 'react-dropzone'
import { IoCloudUploadOutline } from "react-icons/io5";


interface AvatarUploaderProps{
    fieldchange: (FILES: File[]) => void;
    mediaUrl: string,
}

export default function AvatarUploader({fieldchange, mediaUrl}: AvatarUploaderProps) {
    const [file, setFile] = useState<File[]>([])
    const [fileUrl , setFileUrl] = useState(mediaUrl)
    const [isImageSelected, setIsImageSelected] = useState<boolean>(false)
    const [isDragging, setIsDragging] = useState<boolean>(false)

    // when the user drags and drops, onDrop will be excuted
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        // set the file state to dropped file
        setFile(acceptedFiles)
        fieldchange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [fieldchange])

    const {getRootProps, getInputProps} = useDropzone({onDrop, accept: {
        'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp']
    }})

    useEffect(() => {
        if(file.length > 0){
            setIsImageSelected(true)
        }
    }, [file])


    function handleDragOver(e : React.DragEvent<HTMLDivElement>){
        e.preventDefault()
        setIsDragging(true)
    }

    function handleDragLeave(e: React.DragEvent<HTMLElement>){
        e.preventDefault()
        setIsDragging(false)
    }

    return (
        <div>
            {isImageSelected ? <div>
                <img {...getRootProps()} src={fileUrl} width={150} height={90}  alt='profile-image' className='cursor-pointer focus-visible:outline-none rounded-md' />
            </div>
            :
            <div className={`w-full h-[250px] mb-3 border border-gray-400 border-dashed rounded-md flex justify-center ${isDragging && "border border-red-600"}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDragLeave}>
                <button type="button" className={`-mt-3 ${isDragging && "blur-sm"}`} {...getRootProps()}>
                    <IoCloudUploadOutline className="w-[70px] h-auto text-main mx-auto" />
                    <p className="text-base text-primary mt-4 flex flex-wrap"> Drag & drop to upload </p>
                    <p className="mt-2 text-sm text-button text-center hover:cursor-pointer"> or browse </p>
                </button>
            </div>
            }
        </div>
    )
}