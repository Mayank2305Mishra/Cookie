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

const Upload = ({post}:{post?: Models.Document;}) => {
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
  }


  return (
    <section className="mt-10 p-2 flex flex-col">
      <h1 className="text-20 font-bold flex text-white-1"><ChefHat className="h-14 w-14"/>  <b className="flex flex-col justify-center h-16 text-2xl px-1"> Create Recipe </b></h1>
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
                    <Input className="input-form" placeholder="Hazelnut Coffee" {...field} />
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
                    <Textarea className="h-36 bg-black-4 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-cream-1 custom-scrollbar" placeholder="The magic lies in you..." {...field} />
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
                  <Input className="input-form" placeholder="100gms Coffee beans, 100ml milk, water..." {...field} />
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
                  <FormLabel className="text-16 font-bold text-white-1"> 💪 Calories ( optional )</FormLabel>
                  <FormControl>
                  <Input className="input-form" placeholder="600 calories per serving" {...field} />
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
                        <SelectValue className="text-white-1" defaultValue={"Sweet"} placeholder="Select a verified email to display" />
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
          </div>
              <div className="mt-10 w-full">
                <Button type="submit" className="text-16 w-full bg-cream-1 py-4 font-extrabold text-black-1 transition-all duration-500 hover:bg-black-2 hover:text-white-1">
                    Upload Recipe
                </Button>
              </div>
        </form>
      </Form>
    </section>
  );
};

export default Upload;