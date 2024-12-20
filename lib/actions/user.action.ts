import { ID, Query } from "appwrite";
import { databases, account } from "../appwrite.config";
import { users } from "./user.server";
import { SignupParams } from "@/types";

export const signUp = async ({ password, email, name, phone }: SignupParams) => {
    try {
        const newAccount = await users.create(
            ID.unique(),
            email,
            phone,
            password,
            name
        )

        if (!newAccount) return Error('error creating user');
        const avatarUrl = getAvatar(name)
        await signIn(email, password)
        const newUser = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE!,
            process.env.NEXT_PUBLIC_USER_COLLECTION!,
            newAccount.$id,
            {
                userId: newAccount.$id,
                email: email,
                name: name,
                phone: phone,
                avatar: avatarUrl
            }
        );

        return newUser
    } catch (error) {
        console.error('ERROR: ', error);
    }
};

export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        console.error('ERROR', error);
        return error
    }
}

export async function getAccount() {
    try {
        const currentAccount = await account.get()
        return currentAccount;
    } catch (error) {
        console.error(error);
    }
}

export async function getCurrentAccount() {
    try {
        const currentAccount = await getAccount()
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE!,
            process.env.NEXT_PUBLIC_USER_COLLECTION!,
            [Query.equal('userId', currentAccount.$id)]
        );
        if (!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (error) {
        console.error(error);

    }
}

export async function signOut() {
    try {
        const session = await account.deleteSession("current")
        return session;
    } catch (error) {
        console.error(error);
    }
}

export function getAvatar(name: string) {
    const n = name?.match(/(\b\S)?/g)?.join("")?.match(/(^\S|\S$)?/g)?.join("").toUpperCase();
    return `https://api.dicebear.com/6.x/micah/png?seed=${n}&backgroundColor=b6e3f4,c0aede,d1d4f9`
}

export async function emailExist(email: string) {
    try {
        const data = await databases.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE!,
            process.env.NEXT_PUBLIC_USER_COLLECTION!,
            [Query.equal("email", email)]
        )
        if (data.total == 0) {
            return false
        }
        else {
            return true
        }
    } catch (error) {
        console.error('ERROR', error);
    }
}


export async function getUserById(uid: string) {
    try {
            const data = await databases.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE!,
            process.env.NEXT_PUBLIC_USER_COLLECTION!,
            [Query.equal("$id", uid)]
        )
        if (data.total == 0) {
            return {name:"",avatar:""}
        }
        else {
            return data.documents[0]
        }
    } catch (error) {
        console.error('ERROR', error);
    }
}

