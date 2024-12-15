'use client';

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Album, Cookie, Github, Home,  ScanBarcode, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import Logo from '@/app/assets/image.png'

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
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
    <section className='left_sidebar h-[calc(100vh-5px]'>
      <nav className="flex flex-col gap-6">
        <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center">
          <Image src={Logo} alt="logo" width={37} height={37} />
          <h1 className="text-24 font-extrabold text-white max-lg:hidden">Cookie</h1>
        </Link>

        {sidebarLinks.map(({ route, label }) => {
          const isActive = pathname === route || pathname.startsWith(`${route}/`);

          return <Link href={route} key={label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start", {
            ' text-[#ffe8c5] text-xl  font-bold ': isActive
          })}>
            {route == '/' &&
              <Home />
            }
            {route=='/upload' &&
              <Upload/>
            }
            {route == '/cookbook' &&
              <Album />
            }
            {route == '/aibake' &&
              <Cookie />
            }
            <p>{label}</p>
          </Link>
        })}
      </nav>
    </section>
  )
}

export default LeftSidebar