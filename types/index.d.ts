import { EnumLike } from "zod";

declare type SignupParams = {
    name: string;
    email: string;
    phone: string;
    password: string;
}

declare type LoginParams ={
    email: string;
    password: string;
}

declare type User ={
    userId: string;
    name: string;
    email: string;
    phone : string;
    avatar : string;
    bio: string;
}

declare type NewRecipe = {
    userId: string;
    name:string;
    recipe: string;
    file: File[];
    calorie?: string;
    tags: enum;
    type: enum;
    ingredients?: string;
  };

  declare type NewCookbook = {
    userId: string;
    name:string;
    recipe: string[];
    file: File[];
    bio?: string;
  };
