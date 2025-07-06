"use client";

import { useAuth } from "@/hooks/userAuth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Skeleton } from "@/components/Skeleton";

interface Props {
    children: ReactNode;
}

export function AuthGuardClient({ children }: Props) {
    const { user, status } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (status === "checking") return;

        // Si no está autenticado, redirigir al login
        if (status === "non-authenticated") {
            router.push("/login");
            return;
        }

        // Si es admin, bloquear acceso y redirigir al admin
        if (user?.role === "Admin") {
            router.push("/admin");
        }
    }, [status, user, router]);

    if (status === "checking" || !user) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Skeleton className="w-20 h-20 rounded-full" />
                <p className="ml-4 text-lg">Verificando acceso...</p>
            </div>
        );
    }

    return <>{children}</>;
}
