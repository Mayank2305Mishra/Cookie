"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormInputType } from "@/app/(auth)/sign/page";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { AtSign, Eye, EyeOff, Key, Mail } from "lucide-react";
import { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface CustomProps {
  control: Control<any>;
  forminputtype: FormInputType;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const { forminputtype, placeholder } = props;
  switch (forminputtype) {
    case FormInputType.EMAIL:
      return (
        <div className="relative flex items-center">
          <span className="absolute left-3">
            <Mail className="h-5 w-5 " />
          </span>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className="px-10 h-12 text-lg placeholder:text-xl  bg-black-1  font-semibold  border border-black-2 rounded-xl placeholder:text-gray-500 placeholder:font-semibold"
            />
          </FormControl>
        </div>
      );
      break;
    case FormInputType.PASSWORD:
      return (
        <div className="relative flex items-center">
          <span className="absolute left-3">
            <Key className="h-5 w-5 " />
          </span>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              type={passwordVisible ? "text" : "password"}
              className="px-10 h-12 text-lg placeholder:text-xl  bg-black-1  font-semibold  border border-black-2 rounded-xl placeholder:text-gray-500 placeholder:font-semibold"
            />
          </FormControl>
          <div
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          >
            {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>
      );
      break;
    case FormInputType.INPUT:
      return (
        <div className="relative flex items-center">
          <span className="absolute left-3">
            {placeholder == "Enter your name" && (
              <AtSign className="h-5 w-5 " />
            )}
          </span>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className="px-10 h-12 text-lg placeholder:text-xl  bg-black-1  font-semibold  border border-black-2 rounded-xl placeholder:text-gray-500 placeholder:font-semibold"
            />
          </FormControl>
        </div>
      );
      break;
    case FormInputType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="IN"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="chord-input-phone"
          />
        </FormControl>
      );
      break;
    default:
      break;
  }
};

const CustomInput = (props: CustomProps) => {
  const { control, forminputtype, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className=" items-start text-start w-full">
          {forminputtype !== FormInputType.CHECKBOX && label && (
            <FormLabel className="px-1 text-lg font-semibold">
              {label}
            </FormLabel>
          )}
          <RenderInput field={field} props={props} />
          <FormMessage className="chord-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;