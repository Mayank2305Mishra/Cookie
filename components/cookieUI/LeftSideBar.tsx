'use client';

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Album, Cookie, Github, Home, ScanBarcode, SearchIcon, Upload } from 'lucide-react';
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
      route: '/search',
      label: 'Search'
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
            {route == '/upload' &&
              <Upload />
            }
            {route == '/cookbook' &&
              <Album />
            }
            {route == '/search' &&
              <SearchIcon />
            }
            <p>{label}</p>
          </Link>
        })}
      </nav>
      {
        <div className='p-2 text-xs '>
          <h1>Baked by Mayank Mishra 🍪 </h1>
          <h1 className='flex flex-row gap-2 py-1  '>Github : <Link className='px-2 py-0.5 bg-white-1/30  rounded-xl' href={'https://github.com/Mayank2305Mishra'}>Mayank2305Mishra</Link> </h1>
        </div>
      }
    </section>
  )
}

export default LeftSidebar