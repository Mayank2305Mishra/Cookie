import { ID, ImageGravity } from "appwrite";
import { databases, storage } from "../appwrite.config";


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

    const imgUrl = getimgUrl(img.$id)
    if (!imgUrl) {
      await deleteImg(img.$id);
      throw Error;
    }
    const ingredients = recipe.ingredients?.replace(/ /g, "").split(",") || [];
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
        ingredients : ingredients
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
