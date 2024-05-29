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
        <main className='relative inset-0 bottom-0 sm:h-[530px] md:h-[480px] lg:h-[400px] pb-6 bg-card'>
            <footer className='pt-10 max-sm:px-10 sm:px-16 lg:px-24'>
                <div className='flex lg:flex-row max-lg:flex-col max-lg:gap-10 items-start lg:justify-between'>
                    <div>
                        <h3 className='text-2xl'> 🏠Yegarabet </h3>
                        <p className='lg:w-[300px] xl:w-[400px] text-sm mt-5 leading-7'> Reduce the financial burden of living alone, and build a vibrant, connected, and enriching living experience. Join us in making shared living a positive, life-enhancing journey. </p>
                    </div>
                    <div className='flex flex-wrap items-center md:justify-between max-sm:gap-10 sm:gap-16 md:gap-20 lg:gap-14 lg:justify-end mr-10 xl:gap-20'>
                        {Footer_Links.map((element) => {
                            return (
                                <div key={element.title} className='flex flex-col items-start max-sm:gap-2 sm:gap-5'>
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
                <hr className='w-full border-t-0.5 border-regular mt-10' />
                <div className='flex max-md:flex-col max-md:gap-10 md:items-center md:justify-between max-md:mt-7 md:mt-14 lg:mr-10'>
                    <p className='text-sm text-regular leading-7'> Copyright @ 2024 Yegarabet All rights reserved. </p>
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
