import Image from "next/image";
import support from "/public/support.png"


export default function Contactus() {
    return (
        <main className="max-sm:mt-20 sm:mt-28">
            <div className="flex items-start justify-between md:gap-16">
                <Image src={support} alt="contact-us image" className="max-md:hidden md:w-[350px] md:h-[250px] lg:w-[420px] lg:h-[250px] xl:w-[500px] xl:h-[350px] md:-ml-10 lg:ml-0 object-fill" />
                <div className="flex flex-col justify-start max-md:w-full max-md:items-center xl:items-end xl:mr-16">
                    <h2 className="max-sm:text-lg sm:text-2xl text-primary font-bold xl:mr-8"> You have a question ? we got you </h2>
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
                            <textarea name = "message" placeholder="write your question here" className="bg-background text-sm text-primary mt-5 max-sm:w-[280px] sm:w-[360px] md:w-[300px] xl:w-[400px] h-[120px] p-3 border border-secondary rounded-md focus-visible:ring-0 focus-visible:outline-none" />
                        </div>
                        <button type="submit" className="mt-10 w-[150px] bg-button px-5 py-2 text-base text-black font-semibold rounded-md"> Submit </button>
                    </form>
                </div>
            </div>
        </main>
    )
}
