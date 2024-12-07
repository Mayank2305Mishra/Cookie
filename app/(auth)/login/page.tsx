"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, signSchema } from "@/lib/validation";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import {
  emailExist,
  getAccount,
  signIn,
} from "@/lib/actions/user.action";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CustomInput from "@/components/cookieUI/CustomInput";
import SubmitButton from "@/components/cookieUI/SubmitButton";
import Header from "@/components/cookieUI/Header";


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
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setloading(true);
    const { email, password } = values;
    try {
      await signIn(email, password);
      const checkDB = await emailExist(email);
      if (checkDB == 0) {
        toast.error("Email is not registerd. Signup with chord");
        router.push("/sign");
      }
      const user = await getAccount();
      if (user !== undefined) {
        toast.success('Login successful')
        toast.custom((t:any) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-dark-2 rounded-xl shadow-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
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
          router.push("/");
        }, 2555);
      }
      if (user == undefined) {
        toast.error("Invalid credentials. Check email and password");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }


  return (
    <div className='dot px-2 h-screen bg-black-3 text-white-1'>
      <Toaster />
      <div className="pageCenter gap-2 pt-16 ">
        <Header style="text-3xl " />
        <div className="text-left px-4 w-full lg:w-1/3 md:w-1/2">
          <h1 className="text-2xl font-semibold">Namaste</h1>
          <h1 className="font-semibold text-lg  dark:text-gray-400">
            Login to continue
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y w-full items-center justify-center flex flex-col text-center  "
          >
            <div className=" flex flex-col gap-2 px-4 w-full lg:w-1/3 md:w-1/2 text-center  ">
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
            <div className="px-4 py-5 w-full md:w-1/3">
              <SubmitButton
                className="chord-primary-btn w-full"
                isLoading={loading}
                children="Login"
              />
            </div>
            <div>
            <h1 className=' text-base font-medium' >New User? <Link className='text-rose-400 underline  font-semibold underline-offset-3' href='/sign'>Signup</Link></h1>
            </div>
          </form>
        </Form>

      </div>
    </div>
  )
}

export default page