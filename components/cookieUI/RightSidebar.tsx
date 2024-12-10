'use client';

import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { useAuthStore } from "@/app/store"

const RightSidebar = () => {
  const router = useRouter();
  const {user} = useAuthStore()
  return (
    <section className='right_sidebar h-[calc(100vh-5px]'>
        <Link href={`/profile/${user?.userId}`} className="flex border border-black-4 shadow-black-5/20  shadow backdrop-blur-xl gap-3 p-3 rounded-md">
          <div className="flex w-full items-center justify-between">
            <div className='flex flex-row gap-3'>
            <img src={user?.avatar} className='rounded-full h-12 w-12'/>
            <h1 className="text-16 pt-3 truncate font-semibold text-white-1">{user?.name}</h1>
            </div>
            <MoveRight />
          </div>
        </Link>
      <section>
      </section>
      <section className="flex flex-col gap-8 pt-12">
        <div className="flex flex-col gap-6">
          Top recipe of today
        </div>
      </section>
    </section>
  )
}

export default RightSidebar