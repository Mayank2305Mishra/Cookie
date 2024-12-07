import { Account, Client, Databases, Users } from "node-appwrite"

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
    .setKey(process.env.NEXT_PUBLIC_API_KEY!);

export const users = new Users(client);
export const account = new Account(client)
export const databases = new Databases(client)