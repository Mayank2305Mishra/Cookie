"use client"
import { useEffect, useState } from "react";
import { useAuthStore } from "../store";
import { getAllRecipe, getTopCookbook  } from "@/lib/actions/recipe.action";
import Link from "next/link";
import { CookieCookbook, CookieRecipe } from "@/types";


const Home = () => {
  const { user } = useAuthStore()
  const [data, setdata] = useState<CookieRecipe[]>([])
  const [topbook, settopbook] = useState<CookieCookbook>()
  useEffect(() => {
    getAllRecipe().then((recipe: any) => {
      setdata(recipe)
    })
    getTopCookbook().then((data:any)=>{
      settopbook(data)
    })
  }, [])
  return (
    <div className="py-4">
      <h1 className="text-xl text-gray-400 ">Hello</h1>
      <h1 className="text-xl ">Chef <b className="text-cream-1"> {user?.name} </b></h1>
      <br />
      <br />
      <div className="flex flex-wrap gap-6 justify-center sm:justify-start ">
        
      </div>
    </div>
  );
};

export default Home;