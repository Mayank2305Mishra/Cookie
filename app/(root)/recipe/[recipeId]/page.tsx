'use client'
import { useAuthStore } from '@/app/store'
import { Button } from '@/components/ui/button'
import { getRecipeById } from '@/lib/actions/recipe.action'
import { getUserById } from '@/lib/actions/user.action'
import { CookieRecipe } from '@/types'
import { GitBranchPlus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const params = useParams<{ recipeId: string; }>()
    const recipeId = params.recipeId
    const { user } = useAuthStore()
    const [data, setdata] = useState({ name: "", imageUrl: "none", chef: { name: " ", avatar: "none", userId: "" }, tags: "", type: "", recipe: "", ingredients: [''] })
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
                <br />
                <div className='p-4'>
                    <h1 className='font-bold py-2'>Baked by</h1>
                    <Link href={`/profile/${data.chef?.userId}`} className="flex border border-black-4 shadow-black-5/20  shadow backdrop-blur-xl gap-3 p-3 rounded-md">
                        <div className="flex w-full items-center justify-between">
                            <div className='flex flex-row gap-3'>
                                <img src={data.chef?.avatar} className='rounded-full h-12 w-12' />
                                <h1 className="text-16 pt-3 truncate font-semibold text-white-1">{data.chef?.name}</h1>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='flex flex-col gap-4 p-4'>
                    <div className='flex flex-row justify-between'>
                        <h1 className='font-bold p-2'>Recipe</h1>
                        <Link href='/customize' className='font-medium text-sm rounded-lg  border border-black-5 p-2 flex flex-row gap-2'><GitBranchPlus className='h-5 w-5' /> Customize</Link>
                    </div>
                    <div className=''>
                        {data.recipe}
                    </div>
                    <div>
                        <h1 className='font-bold py-2 '>Ingredients</h1>
                        {data.ingredients.map((item) => (
                            <div key={item} className='p-2'>
                                <h1 className='capitalize  font-medium'>⚪ {item}</h1>
                            </div>
                        )
                        )
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className=' font-bold'>Recipe Info</h1>
                        <div className="flex flex-row w-full  justify-between">
                            <div className='border border-black-5 px-4 py-1 text-lg  rounded-md font-semibold'>
                                {data.tags}
                            </div>
                            <div className='border border-black-5 px-4 py-1 text-lg  rounded-md font-semibold'>
                                {data.type}
                            </div>
                            <div>
                                {data.tags == "Spice" &&
                                    <h1>🌶️🌶️🌶️🌶️</h1>
                                }
                                {data.tags == "Tangy" &&
                                    <h1>🌶️🌶️</h1>
                                }
                                {data.tags == "Salty" &&
                                    <h1>🌶️</h1>
                                }
                                {data.tags == "Healthy" &&
                                    <h1>🥬🥬🥬</h1>
                                }
                                {data.tags == "Cold" &&
                                    <h1>❄️❄️❄️</h1>
                                }
                                {data.tags == "Sweet" &&
                                    <h1>🧁🧁🧁</h1>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default page