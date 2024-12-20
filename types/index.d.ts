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
  declare type CookieRecipe = {
    recipeId: string;
    recipe: string;
    name: string;
    imageUrl: string;
    chef : User;
    ingredients: string[],
    tags : string;
    type : string;
    calories : string;
  }
  declare type CookieCookbook ={
    cookbookId : string;
    name: string;
    imageUrl : string;
    user: User;
    bio: string;
    recipe: CookieRecipe[]
  }