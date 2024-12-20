'use client'
import { getCookbookById } from '@/lib/actions/recipe.action';
import { CookieCookbook } from '@/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const params = useParams<{ id: string; }>()
    const id = params.id
    const [cookbook, setcookbook] = useState<CookieCookbook>()
    useEffect(() => {
        getCookbookById(id).then((data: any) => {
            setcookbook(data)
        })
    }, [])

    return (
        <div className='flex flex-1 flex-col '>
            <div className='w-full mt-10 flex flex-col gap-4 '>
                <div className="relative w-full h-64 rounded-3xl">
                    <img src={cookbook?.imageUrl} alt="Sample" className="rounded-3xl w-full h-full object-cover " />
                    <div className="absolute inset-0 p-2 rounded-3xl bg-gradient-to-b from-black-1/5 via-[#0000]/40  to-[#000000] ">
                        <p className="text-white text-2xl font-bold w-full h-full flex flex-col justify-end p-4">{cookbook?.name}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className=' font-bold'>Cookbook by Chef</h1>
                    <Link href={`/profile/${cookbook?.user?.userId}`} className="flex border border-black-4 shadow-black-5/20  shadow backdrop-blur-xl gap-3 p-3 rounded-md">
                        <div className="flex w-full items-center justify-between">
                            <div className='flex flex-row gap-3'>
                                <img src={cookbook?.user?.avatar} className='rounded-full h-12 w-12' />
                                <h1 className="text-16 pt-3 truncate font-semibold text-white-1">{cookbook?.user?.name}</h1>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold'>Recipes</h1>
                    <div className='flex flex-wrap gap-2 '>
                    {cookbook?.recipe.map((recipes) => (
                        <Link key={recipes.recipeId} href={`/recipe/${recipes?.recipeId}`} className="relative w-full md:w-52 h-48 rounded-3xl">
                            <img src={recipes.imageUrl} alt="Sample" className="rounded-3xl w-full h-full object-cover " />
                            <div className="absolute inset-0 p-2 rounded-3xl bg-gradient-to-b from-black-1/5 via-[#0000]/40  to-[#000000] ">
                                <p className="text-white text-2xl font-bold w-full h-full flex flex-col justify-end p-4">{recipes.name}</p>
                            </div>
                        </Link>
                    ))
                    }
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold'>About this cookbook</h1>
                    <h1 className='text-md '>{cookbook?.bio}</h1>
                </div>
                <br />
                <br />
            </div>
        </div>
    )
}

export default page