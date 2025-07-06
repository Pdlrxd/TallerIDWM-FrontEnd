"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/userAuth";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/components/forms/LoginForm";

export const LoginPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: { email: string; password: string }) => {
    setError(null);
    const result = await login(values.email, values.password);
    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 w-full bg-black text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-center">
          BLACKCAT E-Commerce
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-lg">
          La mejor plataforma para encontrar tus productos favoritos.
        </p>
        <Button variant={"outline"} className="mt-4 text-blue-600" onClick={() => window.location.href = "/"}>
          <ArrowLeftIcon /> Inicio
        </Button>
      </div>

      <div className="md:w-1/2 w-full flex items-center justify-center bg-white px-10 py-12">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Inicio de Sesión
          </h2>

          <LoginForm
            onSubmit={handleLogin}
            serverError={error}
            clearError={() => setError(null)}
          />

          <div className="mt-6 text-md text-center">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-blue-600 underline">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
