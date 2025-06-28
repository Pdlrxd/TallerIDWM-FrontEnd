"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { ProductSkeleton } from "@/components/Skeleton";

interface Props {
    children: React.ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
    const { status } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (status === "non-authenticated") {
            router.replace("/login");
        }
    }, [status, router]);

    if (status === "checking") {
        return (
            <div className="max-w-5xl w-full mx-auto py-10">
                <ProductSkeleton />
            </div>
        );
    }

    if (status === "non-authenticated") {
        return null;
    }

    return <>{children}</>;
};
