"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Album, Cookie, Home, MoveRight, Pizza, ScanBarcode, Upload } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from '@/app/assets/image.png'
import { useAuthStore } from "@/app/store"

const MobileNav = () => {
    const {user} = useAuthStore()
    const pathname = usePathname();
    const sidebarLinks = [
        {
            route: '/',
            label: 'Home'
        },
        {
            route: '/upload',
            label: 'Upload'
        },
        {
            route: '/cookbook',
            label: 'Cook Book'
        },
        {
            route: '/aibake',
            label: 'AI - Bake'
        }
    ]
    return (
        <section>
            <Sheet>
                <SheetTrigger>
                    <Pizza />
                </SheetTrigger>
                <SheetContent side="left" className="border-none text-white-1 bg-black-1">
                    <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 pl-4">
                        <Image src={Logo} alt="logo" width={37} height={37} />
                        <h1 className="text-24 font-extrabold  text-white-1 ml-2">Cookie</h1>
                    </Link>
                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <nav className="flex h-full flex-col gap-6 text-white-1">
                                {sidebarLinks.map(({ route, label }) => {
                                    const isActive = pathname === route || pathname.startsWith(`${route}/`);

                                    return <SheetClose asChild key={route}><Link href={route} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-start", {
                                        'text-[#ffe8c5] text-xl  font-bold ': isActive
                                    })}>
                                        {route == '/' &&
                                            <Home />
                                        }
                                        {route == '/upload' &&
                                            <Upload />
                                        }
                                        {route == '/cookbook' &&
                                            <Album />
                                        }
                                        {route == '/foodscan' &&
                                            <ScanBarcode />
                                        }
                                        {route == '/aibake' &&
                                            <Cookie />
                                        }
                                        <p>{label}</p>
                                    </Link>
                                    </SheetClose>
                                })}
                                {
                                    <Link href={`/profile/${user?.userId}`} className="flex border border-black-4 shadow-black-5/20  shadow backdrop-blur-xl gap-3 p-3 rounded-md">
                                        <div className="flex w-full items-center justify-between">
                                            <div className='flex flex-row gap-3'>
                                                <img src={user?.avatar} className='rounded-full h-12 w-12' />
                                                <h1 className="text-16 pt-3 truncate font-semibold text-white-1">{user?.name}</h1>
                                            </div>
                                            <MoveRight />
                                        </div>
                                    </Link>
                                }
                                {
                                    <div className='p-2 text-xs '>
                                        <h1>Baked by Mayank Mishra 🍪 </h1>
                                        <h1 className='flex flex-row gap-2 py-1  '>Github : <Link className='px-2 py-0.5 bg-white-1/30  rounded-xl' href={'https://github.com/Mayank2305Mishra'}>Mayank2305Mishra</Link> </h1>
                                    </div>
                                }
                            </nav>

                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav