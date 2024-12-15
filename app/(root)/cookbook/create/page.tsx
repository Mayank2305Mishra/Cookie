"use client"
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
import { useAuthStore } from '@/app/store'
import { createCookbook, getAllRecipe } from '@/lib/actions/recipe.action'
import { cookbookSchema } from '@/lib/validation'
import { Cookie, CookieIcon, CookingPot } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input";
import { Models } from "appwrite";
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import ImgUploader from "@/components/cookieUI/ImgUploader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";

const dishesList = [
    {
        value:"",
        label:"",
    }
];
const page = ({ post }: { post?: Models.Document; }) => {

    const { user } = useAuthStore()
    const [data, setdata] = useState([{ name: "", imageUrl: "", recipeId: "" }])
    useEffect(() => {
        getAllRecipe().then((recipe: any) => {
            setdata(recipe)
            for (let i = 0; i < recipe.length; i++) {
                dishesList.push({label: recipe[i]?.name , value : recipe[i].recipeId })
            }
            dishesList.shift()
        })
    }, [])
    const router = useRouter()
    const [loading, setloading] = useState(false)
    const form = useForm<z.infer<typeof cookbookSchema>>({
        resolver: zodResolver(cookbookSchema),
        defaultValues: {
            name: "",
            file: [],
            recipe: [],
            bio: ''
        },
    });
    async function onSubmit(values: z.infer<typeof cookbookSchema>) {
        setloading(true);
        try {
            console.log(values);
            const cookbook = await createCookbook({
                name:values.name,
                file: values.file,
                bio : values.bio,
                recipe: values.recipe,
                userId: user.userId
            })
            if(cookbook != undefined){
                toast.success("Cookbook uploaded")
                setTimeout(() => {
                    router.push(`/cookbook/${cookbook.$id}`)
                }, 1500);
            }
        } catch (error) {
            console.error('ERROR', error);
            
        }finally{
            setloading(false)
        }
    }

    return (
        <section className="mt-10 p-2 flex flex-col">
            <Toaster />
            <h1 className="text-20 font-bold flex text-white-1"> <CookingPot className="h-14 w-14" /> <b className="flex flex-col justify-center h-16 text-2xl px-1"> Create Cookbook</b></h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
                    <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10 ">
                        <FormField
                            control={form.control}
                            name="name"
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
                        <h1 className="text-16 font-bold text-white-1">🧁 Baked by :</h1>
                        <Link href={`/profile/${user?.userId}`} className="flex border border-black-4 shadow-black-5/20  shadow backdrop-blur-xl gap-3 p-3 rounded-md">
                            <div className="flex w-full items-center justify-between">
                                <div className='flex flex-row gap-3'>
                                    <img src={user?.avatar} className='rounded-full h-12 w-12' />
                                    <h1 className="text-16 pt-3 truncate font-semibold text-white-1">{user?.name}</h1>
                                </div>
                            </div>
                        </Link>
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
                                <h1>Upload Recipe</h1>
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default page