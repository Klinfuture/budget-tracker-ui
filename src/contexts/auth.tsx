"use client"

import LoadingPage from "@/app/loading";
import { LoadingExpenseCategoryForm } from "@/components/loaders";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, UserCredential } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


interface AuthContext {
    user?: UserCredential["user"];
    loading: boolean
}

interface AuthContextProvider {
    children?: ReactNode
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

const getSessionUser = () => {
    if (typeof window === "undefined") return undefined;
    const user = window.sessionStorage.getItem("user");
    if (!user) return undefined;
    try {
        return JSON.parse(user) as AuthContext["user"];
    } catch {
        return undefined;
    }
}

const setSessionUser = (user: AuthContext["user"]) => {
    if (typeof window === "undefined") return;
    if (!user) {
        window.sessionStorage.removeItem("user");
        return;
    }
    window.sessionStorage.setItem("user", JSON.stringify(user));
}

export function AuthContextProvider({ children }: AuthContextProvider) {

    const [user, setUser] = useState<AuthContext["user"]>(getSessionUser());
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log({ user })
            if (user) {
                // Get the ID token and set it as a cookie
                const idToken = await user.getIdToken();
                await fetch('/api/auth/session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idToken }),
                });
                setUser(user);
                setSessionUser(user)
            } else {
                // Remove session cookie on logout
                await fetch('/api/auth/session', { method: 'DELETE' });
                setUser(undefined);
            }
            setLoading(false);
        });

        return () => {
            unsubscribe()
        }
    }, [])


    return (
        <AuthContext.Provider value={{ user, loading }}>
            {loading ? <LoadingPage /> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const auth = useContext(AuthContext)
    if (!auth) {
        throw new Error("Auth Context must be used within provider")
    }
    return auth
}