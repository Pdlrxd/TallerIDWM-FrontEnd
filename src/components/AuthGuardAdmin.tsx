"use client";

import { useAuth } from "@/hooks/userAuth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Skeleton } from "@/components/Skeleton";

interface Props {
  children: ReactNode;
}

export function AuthGuardAdmin({ children }: Props) {
  const { user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("AuthGuardAdmin - status:", status);
    console.log("AuthGuardAdmin - user:", user);
    if (status === "checking") return;

    if (status === "non-authenticated") {
      router.push("/login");
    } else if (user && user.role !== "Admin") {
      router.push("/products");
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
