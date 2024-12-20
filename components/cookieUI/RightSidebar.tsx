'use client';

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Cookie, MoveRight } from 'lucide-react';
import { useAuthStore } from "@/app/store"
import { CookieCookbook, CookieRecipe } from '@/types';
import { getTopRecipe } from '@/lib/actions/recipe.action';

const RightSidebar = () => {
  const { user } = useAuthStore()
  const [recipe, setrecipe] = useState<CookieRecipe>()
  useEffect(() => {
    getTopRecipe().then((data: any) => {
      setrecipe(data)
    })
  }, [])

  return (
    <section className='right_sidebar h-[calc(100vh-5px]'>
      <Link href={`/profile/${user?.userId}`} className="flex border border-black-4 shadow-black-5/20  shadow backdrop-blur-xl gap-3 p-3 rounded-md">
        <div className="flex w-full items-center justify-between">
          <div className='flex flex-row gap-3'>
            <img src={user?.avatar} className='rounded-full h-12 w-12' />
            <h1 className="text-16 pt-3 truncate font-semibold text-white-1">{user?.name}</h1>
          </div>
          <MoveRight />
        </div>
      </Link>
      <section>
      </section>
      <section className="flex flex-col gap-8 pt-12">
        <div className="flex flex-col gap-6">
          <h1 className='text-lg text-gray-400 font-semibold'>Top recipe of today</h1>
          {recipe !== undefined && 
          <div className='flex flex-col gap-4'>
            <Link key={recipe?.recipeId} href={`/recipe/${recipe?.recipeId}`} className="relative h-48 rounded-3xl">
              <img src={recipe?.imageUrl} alt="Sample" className="rounded-3xl w-full h-full object-cover " />
              <div className="absolute inset-0 p-2 rounded-3xl bg-gradient-to-b from-black-1/5 via-[#0000]/40  to-[#000000] ">
                <p className="text-white text-2xl font-bold w-full h-full flex flex-col justify-end p-4">{recipe?.name}</p>
              </div>
            </Link>
            <Link href={`/profile/${recipe?.chef?.userId}`} className="flex border border-black-4 shadow-black-5/20  shadow backdrop-blur-xl gap-3 p-3 rounded-md">
              <div className="flex w-full items-center justify-between">
                <div className='flex flex-row gap-3'>
                  <img src={recipe?.chef?.avatar} className='rounded-full h-12 w-12' />
                  <h1 className="text-16 pt-3 truncate font-semibold text-white-1">{recipe?.chef.name}</h1>
                </div>
              </div>
            </Link>
          </div>
          }
          {recipe == undefined &&
            <div className='w-full h-full pt-10 flex flex-col justify-center text-center items-center'>
                <h1 className='text-xs flex flex-row gap-4 '>
                    <Cookie  className='animate-ping' />
                    Loading
                    <Cookie className='animate-ping'/>
                </h1>
            </div>
            }
        </div>
      </section>
    </section>
  )
}

export default RightSidebar