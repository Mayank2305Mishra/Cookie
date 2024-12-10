import { Client, Account, Databases, Avatars, Storage } from "appwrite";
  

const client = new Client()

client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)

export const account = new Account(client)
export const databases = new Databases(client)
export const avatars = new Avatars(client)
export const storage = new Storage(client)
