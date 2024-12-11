'use client'
import { useAuthStore } from '@/app/store'
import { getRecipeById } from '@/lib/actions/recipe.action'
import { getUserById } from '@/lib/actions/user.action'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const params = useParams<{ recipeId: string; }>()
    const recipeId = params.recipeId
    const { user } = useAuthStore()
    const [data, setdata] = useState({ name: "", imageUrl: "", chef: { name: " ", avatar: "", userId: "" } })
    useEffect(() => {
        getRecipeById(recipeId).then((recipe: any) => {
            setdata(recipe)
        })
    }, [])
    return (
        <div className='flex flex-1 '>
            <div className='mt-10 w-full'>
                <div className="relative w-full h-64 rounded-3xl">
                    <img src={data.imageUrl} alt="Sample" className="rounded-3xl w-full h-full object-cover " />
                    <div className="absolute inset-0 p-2 rounded-3xl bg-gradient-to-b from-black-1/5 via-[#0000]/40  to-[#000000] ">
                        <p className="text-white text-2xl font-bold w-full h-full flex flex-col justify-end p-4">{data.name}</p>
                    </div>
                </div>
                <div className='flex flex-row gap-2 p-4'>
                    <div className='flex flex-col w-1/2  gap-2'>
                        <h1 className=' font-bold'>Recipe by Chef</h1>
                        <Link href={`/profile/${data.chef?.userId}`} className="flex border border-black-4 shadow-black-5/20  shadow backdrop-blur-xl gap-3 p-3 rounded-md">
                            <div className="flex w-full items-center justify-between">
                                <div className='flex flex-row gap-3'>
                                    <img src={data.chef?.avatar} className='rounded-full h-12 w-12' />
                                    <h1 className="text-16 pt-3 truncate font-semibold text-white-1">{data.chef?.name}</h1>
                                </div>
                                
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-col w-1/2 gap-2'>
                    <h1 className=' font-bold'>Recipe Info</h1>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page