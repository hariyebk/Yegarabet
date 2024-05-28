import Image from "next/image";
import support from "/public/support.png"


export default function Contactus() {
    return (
        <main className="mt-28">
            <div className="flex items-start justify-between">
                <Image src={support} width={550} height={250} alt="contact-us image" className="object-contain" />
                <div className="flex flex-col items-end mr-16">
                    <h2 className="text-2xl text-primary font-bold mr-8"> You have a question ? we got you </h2>
                    <form className="mt-10">
                        <div>
                            <label> 
                                Name &nbsp;
                                <span className="text-xs text-red-500"> * </span> 
                            </label> <br/>
                            <input type="text" name = "name" placeholder="Abebe Kebede" className="contact_input" />
                        </div>
                        <div className="mt-5">
                            <label> 
                                Email  &nbsp;
                                <span className="text-xs text-red-500"> * </span> 
                            </label> <br/>
                            <input type="email" name = "email" placeholder="abebe@gmail.com" className="contact_input" />
                        </div>
                        <div className="mt-5">
                            <label> 
                                Message  &nbsp;
                                <span className="text-xs text-red-500"> * </span> 
                            </label> <br/>
                            <textarea name = "message" placeholder="write your question here" className="bg-background text-sm text-primary mt-5 w-[400px] h-[120px] p-3 border border-secondary rounded-md focus-visible:ring-0 focus-visible:outline-none" />
                        </div>
                        <button type="submit" className="mt-10 w-[150px] bg-button px-5 py-2 text-base text-black font-semibold rounded-md"> Submit </button>
                    </form>
                </div>
            </div>
        </main>
    )
}
