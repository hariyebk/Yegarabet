import Cities from "@/components/Cities";
import Contactus from "@/components/Contactus";
import Hero from "@/components/Hero";
import Process from "@/components/Process";


export default function Home() {
  return (
    <main className="min-h-screen mt-40 mb-28 mx-20">
      <Hero />
      <Cities />
      <div id="how-it-works"/>
      <Process />
      <div id="contact-us"/>
      <Contactus />
    </main>
  );
}
