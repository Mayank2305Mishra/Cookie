'use client'

import { Input } from "@/components/ui/input";
import { getIngredientsTerm, getRecipeTerm, getTagsTerm, getTypeTerm } from "@/lib/actions/recipe.action";
import { CookieCookbook, CookieRecipe } from "@/types";
import Link from "next/link";
import { useState } from "react";

const Search = () => {
  const [term, setterm] = useState('')
  const [resultR, setresultR] = useState<CookieRecipe[]>([])
  const [resultTy, setresultTy] = useState<CookieRecipe[]>([])
  const [resultT, setresultT] = useState<CookieRecipe[]>([])
  const [resultI, setresultI] = useState<CookieRecipe[]>([])
  if (term !== '') {
    getRecipeTerm(term).then((data: any) => {
      setresultR(data)
    })
    getTypeTerm(term).then((data: any) => {
      setresultTy(data)
    })
    getTagsTerm(term).then((data: any) => {
      setresultT(data)
    })
    getIngredientsTerm(term).then((data: any) => {
      setresultI(data)
    })

  }
  return (
    <div className="flex flex-1 mt-10 flex-col">
      <Input type='text' onChangeCapture={e => setterm(e.currentTarget.value)} placeholder='Search' className='input-form' />
      <br />
      <h1 className="text-xl font-bold text-cream-1 py-2">By Recipe</h1>
      <div>
        <div className='flex flex-wrap gap-3'>
          {resultR && resultR.map((recipes) => (
            <Link key={recipes.recipeId} href={`/recipe/${recipes.recipeId}`} className="relative w-full md:w-52 h-48  rounded-3xl">
              <img src={recipes.imageUrl} alt="Sample" className="rounded-3xl w-full h-full object-cover " />
              <div className="absolute inset-0 p-2 rounded-3xl bg-gradient-to-b from-black-1/5 via-[#0000]/40  to-[#000000] ">
                <p className="text-white text-2xl font-bold w-full h-full flex flex-col justify-end p-4">{recipes.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <h1 className="text-xl font-bold text-cream-1 py-2">By Ingredients</h1>
      <div>
        <div className='flex flex-wrap gap-3'>
          {resultI && resultI.map((recipes) => (
            <Link key={recipes.recipeId} href={`/recipe/${recipes.recipeId}`} className="relative w-full md:w-52 h-48  rounded-3xl">
              <img src={recipes.imageUrl} alt="Sample" className="rounded-3xl w-full h-full object-cover " />
              <div className="absolute inset-0 p-2 rounded-3xl bg-gradient-to-b from-black-1/5 via-[#0000]/40  to-[#000000] ">
                <p className="text-white text-2xl font-bold w-full h-full flex flex-col justify-end p-4">{recipes.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <h1 className="text-xl font-bold text-cream-1 py-2">By Type</h1>
      <div>
        <div className='flex flex-wrap gap-3'>
          {resultTy && resultTy.map((recipes) => (
            <Link key={recipes.recipeId} href={`/recipe/${recipes.recipeId}`} className="relative w-full md:w-52 h-48  rounded-3xl">
              <img src={recipes.imageUrl} alt="Sample" className="rounded-3xl w-full h-full object-cover " />
              <div className="absolute inset-0 p-2 rounded-3xl bg-gradient-to-b from-black-1/5 via-[#0000]/40  to-[#000000] ">
                <p className="text-white text-2xl font-bold w-full h-full flex flex-col justify-end p-4">{recipes.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <h1 className="text-xl font-bold text-cream-1 py-2">By Tags</h1>
      <div>
        <div className='flex flex-wrap gap-3'>
          {resultT && resultT.map((recipes) => (
            <Link key={recipes.recipeId} href={`/recipe/${recipes.recipeId}`} className="relative w-full md:w-52 h-48  rounded-3xl">
              <img src={recipes.imageUrl} alt="Sample" className="rounded-3xl w-full h-full object-cover " />
              <div className="absolute inset-0 p-2 rounded-3xl bg-gradient-to-b from-black-1/5 via-[#0000]/40  to-[#000000] ">
                <p className="text-white text-2xl font-bold w-full h-full flex flex-col justify-end p-4">{recipes.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;