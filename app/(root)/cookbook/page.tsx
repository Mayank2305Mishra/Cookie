'use client'
import { getAllCookbook } from "@/lib/actions/recipe.action";
import { CookieCookbook } from "@/types";
import { CirclePlus, CloudDownload, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Cookbook = () => {
  const [cookbook, setcookbook] = useState<CookieCookbook[]>([])
  useEffect(() => {
    getAllCookbook().then((data: any) => {
      setcookbook(data)
    })
  }, [])

  return (
    <div className='flex flex-col gap-4 flex-1'>
      <div className="pt-10">
        <h1 className="text-2xl font-bold ">📖 Cookbooks</h1>
      </div>
      <div className="flex flex-row gap-4">
        <Link href='/cookbook/create' className="h-28 hover:bg-black-2 gap-2 rounded-lg w-28 p-2 text-center flex flex-col justify-center border  border-black-5 bg-black-1">
          <h1 className="text-4xl font-semibold ">+</h1>
          <h1 className="text-xs text-gray-300">Create New</h1>
        </Link>
        <Link href='/cookbook/import' className="h-28 hover:bg-black-2 gap-2 rounded-lg w-28 p-2 text-center flex flex-col justify-center border  border-black-5 bg-black-1">
          <h1 className="w-full text-center items-center flex flex-row justify-center"><CloudDownload className="text-4xl font-semibold" /></h1>
          <h1 className="text-xs text-gray-300">Import</h1>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <h1>All cookbooks</h1>
        <div className="flex flex-wrap p-2 justify-between   gap-3">
        {cookbook.map((books) => (
          <Link key={books.cookbookId} href={`/cookbook/${books.cookbookId}`} className="relative w-[130px] md:w-48 h-48  rounded-3xl">
            <img src={books.imageUrl} alt="Sample" className="rounded-3xl w-full h-full object-cover " />
            <div className="absolute inset-0 p-2 rounded-3xl bg-gradient-to-b from-black-1/5 via-[#0000]/40  to-[#000000] ">
              <p className="text-white text-lg font-bold w-full h-full flex flex-col justify-end p-4">{books.name}</p>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Cookbook;