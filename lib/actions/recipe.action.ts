import { ID, ImageGravity, Query } from "appwrite";
import { databases, storage } from "../appwrite.config";
import { NewCookbook, NewRecipe } from "@/types";


export async function imgUpload(img : File) {
  try {
    const uploadimg = await storage.createFile(
      process.env.NEXT_PUBLIC_STORAGE_ID!,
      ID.unique(),
      img
    )
    return uploadimg
  } catch (error) {
    console.error("ERROR",error)
  }
}

export async function getimgUrl(imgId : string){
try {
  const url = storage.getFilePreview(
    process.env.NEXT_PUBLIC_STORAGE_ID!,
    imgId,
    2000,
    2000,
    ImageGravity.Top,
    100
  )
  if (!url) throw Error;

  return url;
} catch (error) {
  console.error('ERROR',error)
}
}

export async function deleteImg(imgId: string) {
  try {
    await storage.deleteFile(process.env.NEXT_PUBLIC_STORAGE_ID!, imgId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function createRecipe(recipe : NewRecipe) {
  try {
    const img = await imgUpload(recipe.file[0])
    if(!img) throw Error;

    const imgUrl = await getimgUrl(img.$id)
    if (!imgUrl) {
      await deleteImg(img.$id);
      throw Error;
    }
    
    const ingredients = recipe.ingredients?.split(",") || [];
    const docID = ID.unique()
    const newRecipe = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_RECIPE_COLLECTION!,
      docID,
      {
        recipeId:docID,
        name:recipe.name,
        chef: recipe.userId ,
        recipe: recipe.recipe ,
        tags: recipe.tags,
        calories: recipe.calorie,
        imageUrl: imgUrl,
        ingredients : ingredients,
        type: recipe.type,
      }
    );

    if (!newRecipe) {
      await deleteImg(img.$id);
      throw Error;
    }

    return newRecipe;
  } catch (error) {
    console.error('ERROR',error)
  }
}

export async function getRecipeById(recipeId: string) {
  try {
    const recipe = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_RECIPE_COLLECTION!,
      [Query.equal("recipeId", recipeId)]
  )
  return recipe.total > 0 ? recipe.documents[0] : null
  } catch (error) {
    return {name:"No recipe found 404"}
  }
  
}
export async function getAllRecipe(){
  try {
    const recipe = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_RECIPE_COLLECTION!,
  )
  return recipe.documents 
  } catch (error) {
    return {name:"No recipe found 404"}
  }
}

export async function createCookbook(cookbook: NewCookbook) {
  try {
    const img = await imgUpload(cookbook.file[0])
    if(!img) throw Error;

    const imgUrl = await getimgUrl(img.$id)
    if (!imgUrl) {
      await deleteImg(img.$id);
      throw Error;
    }
    const docID = ID.unique()
    const newCookbook = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_COOKBOOK_COLLECTION!,
      docID,
      {
        cookbookId:docID,
        name:cookbook.name,
        user: cookbook.userId ,
        recipe: cookbook.recipe ,
        imageUrl: imgUrl,
        bio: cookbook.bio
      }
    );

    if (!newCookbook) {
      await deleteImg(img.$id);
      throw Error;
    }

    return newCookbook;
    
  } catch (error) {
    console.error('Error',error);
    
  }  
  
}

export async function getCookbookByUser(uid: string) {
  try {
    const recipe = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_COOKBOOK_COLLECTION!,
      [Query.equal("user", uid)]
  )
  return recipe.total > 0 ? recipe.documents : null
  } catch (error) {
    return {name:"No recipe found 404"}
  }
  
}
export async function getRecipeByUser(uid: string) {
  try {
    const recipe = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_RECIPE_COLLECTION!,
      [Query.equal("chef", uid)]
  )
  return recipe.total > 0 ? recipe.documents : null
  } catch (error) {
    return {name:"No recipe found 404"}
  }
  
}

export async function getCookbookById(cookbookId: string) {
  try {
    const recipe = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_COOKBOOK_COLLECTION!,
      [Query.equal("cookbookId", cookbookId)]
  )
  return recipe.total > 0 ? recipe.documents[0] : null
  } catch (error) {
    return {name:"No recipe found 404"}
  }
  
}
export async function getAllCookbook(){
  try {
    const recipe = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_COOKBOOK_COLLECTION!,
  )
  return recipe.documents 
  } catch (error) {
    return {name:"No recipe found 404"}
  }
}

export async function getTopRecipe() {
  try {
    const recipe = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_RECIPE_COLLECTION!,
    )
    const x = Math.floor((Math.random() * recipe.total) + 0)
  return recipe.documents[x]
  } catch (error) {
    return {name:"No recipe found 404"}
  }
  
}
export async function getTopCookbook() {
  try {
    const recipe = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_COOKBOOK_COLLECTION!,
    )
    const x = Math.floor((Math.random() * recipe.total) + 0)
  return recipe.documents[x]
  } catch (error) {
    return {name:"No recipe found 404"}
  }
  
}

export async function getRecipeType(type: string) {
  try {
    const recipe = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_RECIPE_COLLECTION!,
      [Query.equal("type", type)]
  )
  return recipe.total > 0 ? recipe.documents : null
  } catch (error) {
    return {name:"No recipe found 404"}
  }
}
export async function getRecipeTag(tag: string) {
  try {
    const recipe = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_RECIPE_COLLECTION!,
      [Query.equal("tags", tag)]
  )
  return recipe.total > 0 ? recipe.documents : null
  } catch (error) {
    return {name:"No recipe found 404"}
  }
}
