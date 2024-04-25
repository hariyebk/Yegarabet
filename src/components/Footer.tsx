import Link from 'next/link'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { Footer_Links } from '@/constants';

export default function Footer() {
    return (
        <main className='relative inset-x-0 bottom-0 h-[350px] bg-card'>
            <footer className='pt-10 px-24'>
                <div className='mb-10 flex items-start justify-between'>
                    <div className=''>
                        <h3 className='text-2xl'> 🏠RoomLink </h3>
                        <p className='w-[400px] text-sm mt-5 leading-7'> Reduce the financial burden of living alone, and build a vibrant, connected, and enriching living experience. Join us in making shared living a positive, life-enhancing journey. </p>
                    </div>
                    <div className='flex items-center justify-end mr-10 gap-20'>
                        {Footer_Links.map((element) => {
                            return (
                                <div key={element.title} className='flex flex-col items-start gap-5'>
                                    <h4 className='mb-5 text-xl'> {element.title} </h4>
                                    <ul className='flex flex-col items-start gap-4'>
                                        {element.links.map((link) => {
                                            return (
                                                <Link href={link.path} key={link.label} className='text-sm text-regular'> {link.label} </Link>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <hr className='w-full border-t-0.5 border-regular' />
                <div className='flex items-center justify-between mt-14 pb-10 mr-10'>
                    <p className='text-sm text-regular'> Copyright @ 2024 RoomLink All rights reserved. </p>
                    <ul className='flex items-center gap-5'>
                        <Link href="https://www.facebook.com"> <FaFacebook className='w-4 h-4' /> </Link>
                        <Link href="https://www.instagram.com"> <FaInstagram className='w-4 h-4' /> </Link>
                        <Link href="https://www.telegram.org"> <FaTelegram className='w-4 h-4' /> </Link>
                        <Link href="https://www.youtube.com"> <FaYoutube className='w-4 h-4' /> </Link>
                        <Link href="https://www.twitter.com"> <FaXTwitter className='w-4 h-4' /> </Link>
                        <Link href="https://www.tiktok.com"> <FaTiktok className='w-4 h-4' /> </Link>
                    </ul>
                </div>
            </footer>
        </main>
    )
}
