'use client'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signSchema } from "@/lib/validation";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import SubmitButton from "@/components/cookieUI/SubmitButton";
import { emailExist, signUp } from "@/lib/actions/user.action";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button"; 
import Header from '@/components/cookieUI/Header'
import React from 'react'
import CustomInput from "@/components/cookieUI/CustomInput";


export enum FormInputType {
  INPUT = "input",
  EMAIL = "email",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  PASSWORD = "password",
}


const page = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const form = useForm<z.infer<typeof signSchema>>({
    resolver: zodResolver(signSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signSchema>) {
    setloading(true);
    try {
      const user = await signUp(values);
      const DBcheck = await emailExist(values.email)
      if(DBcheck && DBcheck > 0){
        toast.error('Same user exists. Try to Login')
        setTimeout(() => {
          router.push('/login')
        }, 1500);
      }
      if (user !== undefined) {
        toast.success('Signup successful')
        toast.custom((t:any) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-dark-2 rounded-xl shadow-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full bg-light-2"
                    src={user?.avatar}
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-white ">
                    {user?.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ))
        setTimeout(() => {
          router.push('/')
        }, 1500);
      }
      if(user == undefined){
        toast.error("Same user exsits. Try to login.")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }


  return (
    <div className='dot px-2 h-full bg-black-3 text-white-1'>
      <Toaster />
      <div className="pageCenter gap-2">
        <Header style="text-3xl " />
        <div className="text-left px-4 w-full lg:w-1/3 md:w-1/2">
          <h1 className="text-2xl font-semibold">Namaste</h1>
          <h1 className="font-semibold text-lg  text-gray-400">
            Signup to continue
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y w-full items-center justify-center flex flex-col text-center  "
          >
            <div className=" flex flex-col gap-2 px-4 w-full lg:w-1/3 md:w-1/2 text-center  ">
              <CustomInput
                forminputtype={FormInputType.INPUT}
                control={form.control}
                name="name"
                placeholder="Enter your name"
                label="Name"
              />
              <CustomInput
                forminputtype={FormInputType.PHONE_INPUT}
                control={form.control}
                name="phone"
                placeholder="Enter your Phone No."
                label="Phone"
              />
              <CustomInput
                forminputtype={FormInputType.EMAIL}
                control={form.control}
                name="email"
                placeholder="Enter your email"
                label="Email"
              />
              <CustomInput
                forminputtype={FormInputType.PASSWORD}
                control={form.control}
                name="password"
                placeholder="Enter your password"
                label="Password"
              />
            </div>
            <div className="px-4 py-3 w-full md:w-1/3">
              <SubmitButton
                className="chord-primary-btn w-full"
                isLoading={loading}
                children="Signup"
              />
            </div>
            <div>
              <h1 className=' text-base font-medium py-1 ' >Already a user? <Link className='text-rose-400 underline  font-semibold underline-offset-3' href='/login'>Login</Link></h1>
            </div>
            <br />
          </form>
        </Form>
      </div>
    </div>
  )
}

export default page