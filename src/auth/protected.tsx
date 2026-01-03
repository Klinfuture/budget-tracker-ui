"use client"

import LoadingPage from "@/app/loading";
import { useAuth } from "@/contexts/auth";
import { RETURN_URL_DATA_KEY, ROUTES } from "@/utils/auth";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!user) {
            const returnUlr = pathname
            router.push(`${ROUTES.LOGIN}?${RETURN_URL_DATA_KEY}=${encodeURIComponent(returnUlr)}`)
        }
    }, [router, user]);

    if (loading) {
        return <LoadingPage />
    }

    return <>{user ? children : null}</>;
}