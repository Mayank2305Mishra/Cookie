import { CirclePlus, CloudDownload, Plus } from "lucide-react";
import Link from "next/link";

const Cookbook = () => {
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
      </div>
    );
  };
  
  export default Cookbook;