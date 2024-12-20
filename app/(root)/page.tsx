"use client"
import { useEffect, useState } from "react";
import { useAuthStore } from "../store";
import { getAllCookbook, getAllRecipe, getRecipeTag, getRecipeType, getTopCookbook } from "@/lib/actions/recipe.action";
import Link from "next/link";
import { CookieCookbook, CookieRecipe } from "@/types";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";


const Home = () => {
  const { user } = useAuthStore()
  const [data, setdata] = useState<CookieRecipe[]>([])
  const [topbook, settopbook] = useState<CookieCookbook>()
  const [cookbook, setcookbook] = useState<CookieCookbook[]>([])
  function Veg(e: any) {
    e.preventDefault()
    getRecipeType("Veg").then((data: any) => {
      setdata(data)
    })
  }
  function Vegan(e: any) {
    e.preventDefault()
    getRecipeType("Vegan").then((data: any) => {
      setdata(data)
    })
  }
  function Sweet(e: any) {
    e.preventDefault()
    getRecipeTag("Sweet").then((data: any) => {
      setdata(data)
    })
  }
  function Spice(e: any) {
    e.preventDefault()
    getRecipeTag("Spice").then((data: any) => {
      setdata(data)
    })
  }
  useEffect(() => {
    getAllRecipe().then((recipe: any) => {
      setdata(recipe)
    })
    getAllCookbook().then((data:any)=>{
      setcookbook(data)
    })
    getTopCookbook().then((data: any) => {
      settopbook(data)
    })
  }, [])
  return (
    <div className="py-4">
      {user.name !== '' && 
      <div>
      <h1 className="text-xl text-gray-400 ">Hello</h1>
      <h1 className="text-xl ">Chef <b className="text-cream-1"> {user?.name} </b></h1>
      <br />
      <br />
      <div className="flex flex-wrap gap-6  ">
        <h1 className="text-xl font-bold text-cream-1 ">Top cookbook for you</h1>
        <Link href={`/cookbook/${topbook?.cookbookId}`} className="relative w-full h-64 rounded-3xl">
          <img src={topbook?.imageUrl} alt="Sample" className="rounded-3xl w-full h-full object-cover " />
          <div className="absolute inset-0 p-2 rounded-3xl bg-gradient-to-b from-black-1/5 via-[#0000]/40  to-[#000000] ">
            <p className="text-white text-2xl font-bold w-full h-full flex flex-col justify-end p-4">
              {topbook?.name}
              <h1 className="text-xs flex  flex-row gap-2 pt-3 "> <b className="h-[40px]  font-medium flex flex-col justify-center"> By {topbook?.user.name} </b> <img src={topbook?.user.avatar} alt="." className="h-[40px] w-[40px] rounded-full" /> </h1>
            </p>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold text-cream-1 ">Mouth watering recipes</h1>
        <div className="flex flex-row gap-2 ">
          <Button onClick={Veg} className="bg-white-1/10 rounded-xl">Veg</Button>
          <Button onClick={Vegan} className="bg-white-1/10 rounded-xl">Vegan</Button>
          <Button onClick={Sweet} className="bg-white-1/10 rounded-xl">Sweet</Button>
          <Button onClick={Spice} className="bg-white-1/10 rounded-xl">Spice</Button>
        </div>
        <div className="flex flex-wrap gap-2 justify-center md:justify-between">
        {data && data.map((recipes) => (
          <Link key={recipes.recipeId} href={`/recipe/${recipes.recipeId}`} className="relative w-[140px] md:w-52 h-48  rounded-3xl">
            <img src={recipes.imageUrl} alt="Sample" className="rounded-3xl w-full h-full object-cover " />
            <div className="absolute inset-0 p-2 rounded-3xl bg-gradient-to-b from-black-1/5 via-[#0000]/40  to-[#000000] ">
              <p className="text-white text-xl font-bold w-full h-full flex flex-col justify-end p-1">{recipes.name}</p>
            </div>
          </Link>
        ))}
        </div>
      </div>
      <br />
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold text-cream-1 "> Cookbooks</h1>
        <div className="flex flex-wrap gap-2 justify-center md:justify-between">
        {cookbook && cookbook.map((recipes) => (
          <Link key={recipes.cookbookId} href={`/cookbook/${recipes.cookbookId}`} className="relative w-[140px] md:w-52 h-48  rounded-3xl">
            <img src={recipes.imageUrl} alt="Sample" className="rounded-3xl w-full h-full object-cover " />
            <div className="absolute inset-0 p-2 rounded-3xl bg-gradient-to-b from-black-1/5 via-[#0000]/40  to-[#000000] ">
              <p className="text-white text-xl font-bold w-full h-full flex flex-col justify-end p-1">{recipes.name}</p>
            </div>
          </Link>
        ))}
        </div>
      </div>
      </div> 
      }
      {user.name == '' &&
            <div className='w-full h-screen pt-20 flex flex-col justify-center text-center items-center'>
                <h1 className='text-xs flex flex-row gap-4 '>
                    <Cookie  className='animate-ping' />
                    Loading
                    <Cookie className='animate-ping'/>
                </h1>
            </div>
            }
    </div>
  );
};

export default Home;