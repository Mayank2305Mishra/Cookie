import type { Metadata } from "next";
import "../globals.css";
import Image from "next/image";
import LeftSidebar from "@/components/cookieUI/LeftSideBar";
import RightSidebar from "@/components/cookieUI/RightSidebar";
import { Toaster } from "@/components/ui/toaster";
import MobileNav from "@/components/cookieUI/MobileNav";
import Logo from '../assets/image.png'
export const metadata: Metadata = {
  title: "Cookie",
  description: "A social cookbook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-white-1 relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSidebar />
        
        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
            <div className=" flex h-16 items-center justify-between md:hidden">
            <Image 
                src={Logo}
                width={30}
                height={30}
                alt="menu icon"
              />
              <MobileNav />
            </div>
            <div className="flex flex-col md:pb-14">
              <Toaster />
              {children}
            </div>
          </div>
        </section>

        <RightSidebar />
      </main>
    </div>
  );
}
