import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import StateProvider from "@/context/Provider";

const nunito = Nunito({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Yegarabet",
  description: "Find compatible roommates for shared accommodation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StateProvider>
        <body className={nunito.className}>
          <Toaster />
          <Navbar />
          {children}
          <Footer/>
        </body>
      </StateProvider>
    </html>
  );
}
