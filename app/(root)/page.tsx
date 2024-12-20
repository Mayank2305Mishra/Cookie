"use client"
import { useEffect, useState } from "react";
import { useAuthStore } from "../store";
import { getAllRecipe  } from "@/lib/actions/recipe.action";
import Link from "next/link";


const Home = () => {
  const { user } = useAuthStore()
  const [data, setdata] = useState([{name:"",imageUrl:"" , recipeId:""}])
  useEffect(() => {
    getAllRecipe().then((recipe: any) => {
      setdata(recipe)
    })
  }, [])
  return (
    <div className="py-4">
      <h1 className="text-xl text-gray-400 ">Hello</h1>
      <h1 className="text-xl ">Chef <b className="text-cream-1"> {user?.name} </b></h1>
      <br />
      <br />
      <div className="flex flex-wrap gap-6 justify-center sm:justify-start ">
        {data.map((recipe)=>(
          <Link key={recipe.recipeId} href={`/recipe/${recipe.recipeId}`} className="relative w-full md:w-80 h-48 rounded-3xl">
          <img src={recipe.imageUrl} alt="Sample" className="rounded-3xl w-full h-full object-cover " />
          <div className="absolute inset-0 p-2 rounded-3xl bg-gradient-to-b from-black-1/5 via-[#0000]/40  to-[#000000] ">
              <p className="text-white text-2xl font-bold w-full h-full flex flex-col justify-end p-4">{recipe.name}</p>
          </div>
      </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;