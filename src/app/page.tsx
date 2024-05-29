import Cities from "@/components/Cities";
import Contactus from "@/components/Contactus";
import Hero from "@/components/Hero";
import Process from "@/components/Process";


export default function Home() {
  return (
    <main className="min-h-screen max-sm:mt-28 sm:mt-36 md:mt-40 mb-28 max-md:mx-10 md:mx-20">
      <Hero />
      <Cities />
      <div id="how-it-works"/>
      <Process />
      <div id="contact-us"/>
      <Contactus />
    </main>
  );
}
