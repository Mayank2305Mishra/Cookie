'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentAccount } from "@/lib/actions/user.action";
import { User } from "@/types";

export const INITIAL_USER = {
    userId: "",
    name: "",
    email: "",
    phone:"",
    avatar: "https://api.dicebear.com/6.x/micah/png?seed=MM&backgroundColor=b6e3f4,c0aede,d1d4f9",
    bio: "",
}

export const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean,
}

type ContextType = {
    user: User;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
};
const AuthContext = createContext<ContextType>(INITIAL_STATE)

export const AuthProvider  = ({ children }: { children: React.ReactNode }) => {
    const route=useRouter()
    const [user, setUser] = useState(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const checkAuthUser = async () => {
        setIsLoading(true)
        try {
            const currentAccount = await getCurrentAccount()
            if (currentAccount) {
                setUser({
                    userId: currentAccount.accountId,
                    name: currentAccount.name,
                    email: currentAccount.email,
                    avatar: currentAccount.avatar,
                    bio: currentAccount.bio,
                    phone: currentAccount.phone,
                })
                setIsAuthenticated(true)
                return true
            }
            return false
        } catch (error) {
            console.log(error);
            return false
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        checkAuthUser();
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (cookieFallback === "[]" || cookieFallback === null || cookieFallback === undefined) { route.push("/sign"); }
    }, [])
    
    const values = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }
    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)