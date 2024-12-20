'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createCookbook, getCookbookById } from '@/lib/actions/recipe.action'
import { CookieCookbook } from '@/types'
import { Cookie, Link } from 'lucide-react'
import React, { useState } from 'react'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { cookbookSchema } from '@/lib/validation'
import ImgUploader from '@/components/cookieUI/ImgUploader'
import { Models } from 'appwrite'
import { MultiSelect } from '@/components/ui/multi-select'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore } from '@/app/store'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'


const dishesList = [
  {
    value: "",
    label: "",
  }
];


const page = ({ post }: { post?: Models.Document; }) => {
  const { user } = useAuthStore()
  const [url, seturl] = useState('')
  const router = useRouter()
  const [loading, setloading] = useState(false)
  const [cookbook, setcookbook] = useState<CookieCookbook>()
  const [imploading, setimploading] = useState(false)
  async function Import() {
    const id = url.split("https://cookie-bake.vercel.app/cookbook/")[1];
    setimploading(true)
    getCookbookById(id).then((data: any) => {
      setcookbook(data)
      for (let i = 0; i < data.recipe.length; i++) {
        dishesList.push({ label: data?.recipe[i]?.name, value: data.recipe[i].recipeId })
      }
      dishesList.shift()
    })
  }
  const form = useForm<z.infer<typeof cookbookSchema>>({
    resolver: zodResolver(cookbookSchema),
    defaultValues: {
      name: cookbook?.name,
      file: [],
      recipe: [],
      bio: cookbook?.bio
    },
  });
  async function onSubmit(values: z.infer<typeof cookbookSchema>) {
    setloading(true)
    console.log(values);
    try {
      console.log(values);
      const cookbook = await createCookbook({
        name: values.name,
        file: values.file,
        bio: values.bio,
        recipe: values.recipe,
        userId: user.userId
      })
      if (cookbook != undefined) {
        toast.success("Cookbook uploaded")
        setTimeout(() => {
          router.push(`/cookbook/${cookbook.$id}`)
        }, 1500);
      }
    } catch (error) {
      console.error('ERROR', error);

    } finally {
      setloading(false)
    }
  }

  return (
    <div className='flex flex-1 flex-col gap-4 mt-10'>
      <Toaster/>
      <h1 className='text-2xl font-bold text-cream-1' >Import Cookbook</h1>
      <h1 className='text-md text-gray-400'>Import any cookbook present on cookie by its URL</h1>
      <div className='flex flex-row gap-1'>
        <Input type='url' onChangeCapture={e => seturl(e.currentTarget.value)} placeholder='Enter the url' className='input-form' />
        <Button onClick={Import} className='px-4 text-black-1 h-12 font-semibold  bg-cream-1 rounded-lg '>Import</Button>
      </div>
      {imploading && !cookbook &&
        <div className='py-4 text-center flex flex-row justify-center items-center'>
          <h1 className='  animate-ping text-gray-400 text-xs flex flex-row gap-2 '><Cookie /> Fetching <Cookie /> </h1>
        </div>
      }
      {cookbook &&
        <div className='flex flex-col'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
              <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10 ">
                <FormField
                  control={form.control}
                  name="name"
                  defaultValue={cookbook.name}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2.5">
                      <FormLabel className="text-16 font-bold text-white-1">🍰 Add a sweet name</FormLabel>
                      <FormControl>
                        <Input className="input-form" placeholder="Ex: Secret Magic" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-16 font-bold text-white-1">📷 Add Photo</FormLabel>
                      <FormControl>
                        <ImgUploader
                          fieldChange={field.onChange}
                          mediaUrl={post?.imageUrl}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>🍥 Add Recipes</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={dishesList}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          placeholder="Select options"
                          variant="inverted"
                          animation={2}
                          maxCount={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  defaultValue={cookbook.bio}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2.5">
                      <FormLabel className="text-16 font-bold text-white-1">🍪 Add description</FormLabel>
                      <FormControl>
                        <Textarea className="h-36 bg-black-4 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-cream-1 custom-scrollbar" placeholder="Ex:  The magic lies in you..." {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>

                  )}
                />
              </div>
              <div className="mt-10 w-full">
                <Button type="submit" className="text-16 w-full bg-cream-1 py-4 font-extrabold text-black-1 transition-all duration-500 hover:bg-black-2 hover:text-white-1">
                  {loading &&
                    <div className="flex">
                      <Cookie className="animate-ping" />
                      <h1 className="">Uploading..</h1>
                      <Cookie className="animate-ping" />
                    </div>
                  }
                  {!loading &&
                    <h1>Import Cookbook</h1>
                  }
                </Button>
              </div>
            </form>
          </Form>
        </div>
      }
    </div>
  )
}

export default page