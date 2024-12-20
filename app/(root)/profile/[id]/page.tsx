'use client'
import { getCookbookByUser, getRecipeByUser } from '@/lib/actions/recipe.action';
import { getUserById } from '@/lib/actions/user.action';
import { CookieCookbook, CookieRecipe, User } from '@/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const params = useParams<{ id: string; }>()
    const id = params.id
    const [user, setuser] = useState<User>()
    const [coobook, setcoobook] = useState<CookieCookbook[]>([])
    const [recipe, setrecipe] = useState<CookieRecipe[]>([])
    useEffect(() => {
        getUserById(id).then((data: any) => {
            setuser(data)
        })
        getCookbookByUser(id).then((data: any) => {
            setcoobook(data)
        })
        getRecipeByUser(id).then((data: any) => {
            setrecipe(data)
        })
    }, [])
    //console.log(recipe);
    return (
        <div className='flex flex-1 mt-20 flex-col gap-4'>
            <h1 className='text-2xl font-bold text-cream-1 '>Chef's menu</h1>
            <div className='flex flex-row gap-4 '>
                <img src={user?.avatar} alt="." className='rounded-full h-28 w-28' />
                <div className='h-28 flex flex-col justify-center '>
                    <h1 className='text-lg font-bold'>{user?.name}</h1>
                    <h1 className='text-xs text-gray-400 '>{user?.bio}</h1>
                </div>
            </div>
            <div className='flex flex-col gap-2 '>
                <h1 className='py-2 text-lg font-bold'>Recipes uploaded</h1>
                <div className='flex flex-wrap gap-3'>
                    {recipe.map((recipes) => (
                        <Link key={recipes.recipeId} href={`/recipe/${recipes.recipeId}`} className="relative w-full md:w-52 h-48  rounded-3xl">
                            <img src={recipes.imageUrl} alt="Sample" className="rounded-3xl w-full h-full object-cover " />
                            <div className="absolute inset-0 p-2 rounded-3xl bg-gradient-to-b from-black-1/5 via-[#0000]/40  to-[#000000] ">
                                <p className="text-white text-2xl font-bold w-full h-full flex flex-col justify-end p-4">{recipes.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='flex flex-col gap-2 '>
                <h1 className='py-2 text-lg font-bold'>Cookbooks uploaded</h1>
                <div className='flex flex-wrap gap-3'>
                    {coobook.map((books) => (
                        <Link key={books.cookbookId} href={`/cookbook/${books.cookbookId}`} className="relative w-full md:w-52 h-48  rounded-3xl">
                            <img src={books.imageUrl} alt="Sample" className="rounded-3xl w-full h-full object-cover " />
                            <div className="absolute inset-0 p-2 rounded-3xl bg-gradient-to-b from-black-1/5 via-[#0000]/40  to-[#000000] ">
                                <p className="text-white text-2xl font-bold w-full h-full flex flex-col justify-end p-4">{books.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page