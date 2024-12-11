"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useAuthStore } from "@/app/store";
import { createRecipe } from "@/lib/actions/recipe.action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { recipeSchema } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea";
import ImgUploader from "@/components/cookieUI/ImgUploader";
import { Input } from "@/components/ui/input";
import { ChefHat, Cookie } from "lucide-react";
import { Models } from "appwrite";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";


const Upload = ({ post }: { post?: Models.Document; }) => {
  const { user } = useAuthStore()
  const router = useRouter()
  const [loading, setloading] = useState(false)
  async function createCoffee() {
    console.log(user?.userId);
    //const rec = await createRecipe({ name: 'Coffee', userId: user?.userId, recipe: 'Make some coffe', file: '', calorie: '200', tags: 'Sweet', ingredients: 'Milk, coffee , water sugar' })
    //console.log(rec);
  }
  const form = useForm<z.infer<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      recipe: "",
      file: [],
      calories: "",
      tags: "Sweet",
      ingredients: "",
    },
  });
  async function onSubmit(values: z.infer<typeof recipeSchema>) {
    setloading(true);
    console.log(values);
    try {

      const recipeUpload = await createRecipe({
        userId: user.userId,
        name: values.name,
        recipe: values.recipe,
        file: values.file,
        calorie: values.calories,
        tags: values.tags,
        ingredients: values.ingredients
      })
      if(recipeUpload){
      toast.success("Recipe uploaded sucessfully")
      }
      console.log(recipeUpload)
      setTimeout(() => {
        router.push(`/recipe/${recipeUpload?.$id}`)
      }, 2500);

    } catch (error) {
      console.error(error);

    }finally{
     setloading(false)
    }

  }


  return (
    <section className="mt-10 p-2 flex flex-col">
      <Toaster/>
      <h1 className="text-20 font-bold flex text-white-1"><ChefHat className="h-14 w-14" />  <b className="flex flex-col justify-center h-16 text-2xl px-1"> Create Recipe </b></h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">🌶️ Add a spice name</FormLabel>
                  <FormControl>
                    <Input className="input-form" placeholder="Ex: Hazelnut Coffee" {...field} />
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
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">🍪 Add recipe</FormLabel>
                  <FormControl>
                    <Textarea className="h-36 bg-black-4 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-cream-1 custom-scrollbar" placeholder="Ex:  The magic lies in you..." {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>

              )}
            />
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">🥕 Add ingredients (seperate by ',')</FormLabel>
                  <FormControl>
                    <Input className="input-form" placeholder="Ex:  100gms Coffee beans, 100ml milk, water..." {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>

              )}
            />
            <FormField
              control={form.control}
              name="calories"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1"> 💪 Calories ( optional )</FormLabel>
                  <FormControl>
                    <Input className="input-form" placeholder="Ex:  600 calories per serving" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>

              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-16 font-bold text-white-1">
                    🍵 Add Tag
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-white-1 bg-black-4 ring-offset-cream-1">
                        <SelectValue className="text-white-1" defaultValue={"Sweet"} placeholder="Ex:  Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black-1  ring-offset-cream-1 text-white-1 font-lg">
                      <SelectItem className="focus:bg-cream-1 focus:text-black-1" value="Sweet">Sweet</SelectItem>
                      <SelectItem className="focus:bg-cream-1 focus:text-black-1" value="Spice">Spice</SelectItem>
                      <SelectItem className="focus:bg-cream-1 focus:text-black-1" value="Cold">Cold</SelectItem>
                      <SelectItem className="focus:bg-cream-1 focus:text-black-1" value="Salty">Salty</SelectItem>
                      <SelectItem className="focus:bg-cream-1 focus:text-black-1" value="Tangy">Tangy</SelectItem>
                      <SelectItem className="focus:bg-cream-1 focus:text-black-1" value="Healthy">Healthy</SelectItem>
                    </SelectContent>
                  </Select>
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
  );
};

export default Upload;
