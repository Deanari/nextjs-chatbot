'use-client';

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import MobileSidebar from "@/components/mobile-sidebar";

const font = Poppins({
    weight: "600",
    subsets: ["latin"]
})

export const NavBar = () => {
    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary-10 bg-secondary h-16">
            <div className="flex ites-center">
                <MobileSidebar />
                <Link href='/'>
                <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-primary", font.className)}> 
                    Chatbot AI
                </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                <ModeToggle />
                <UserButton data-testid="user-button"/>
            </div>
        </div>
    )
}