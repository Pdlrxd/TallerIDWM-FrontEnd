"use client";

import { useAuth } from "@/hooks/userAuth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Skeleton } from "@/components/Skeleton";

interface Props {
    children: ReactNode;
}

export function AuthGuardClient({ children }: Props) {
    const { user, status } = useAuth();
    const router = useRouter();
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        if (status === "checking") return;

        if (status === "non-authenticated") {
            router.push("/login");
            return;
        }

        if (user?.role === "Admin") {
            router.push("/admin");
            return;
        }

        setAllowed(true); // usuario cliente autorizado
    }, [status, user, router]);

    if (status === "checking" || !allowed) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Skeleton className="w-20 h-20 rounded-full" />
                <p className="ml-4 text-lg">Verificando acceso...</p>
            </div>
        );
    }

    // Si llegamos acá, usuario es cliente autorizado
    return <>{children}</>;
}
