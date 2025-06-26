"use client";

import { Button } from "@/components/ui/Button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { User } from "@/interfaces/User";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

// Función simple para decodificar payload del token
const parseJwt = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64));
    } catch (e) {
        return null;
    }
};

const formSchema = z.object({
    email: z.string().email({ message: "Ingrese un correo electrónico válido." }).nonempty({ message: "Email es requerido." }),
    password: z.string().nonempty({ message: "Contraseña es requerida." }),
});

export const LoginPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [errors, setErrors] = useState<string | null>(null);
    const { auth } = useContext(AuthContext);
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { data } = await ApiBackend.post<ResponseAPI>("auth/login", values);

            if (data.success === false) {
                setErrors(data.message || "Correo o contraseña incorrectos.");
                return;
            }

            const token = data.data;
            const payload = parseJwt(token);

            if (!payload) {
                setErrors("Token inválido recibido.");
                return;
            }

            // Guardar token
            localStorage.setItem("token", token);

            const user_: User = {
                email: payload.email,
                token: token,
                role: payload.role
            };

            auth(user_);

            // Redirección por rol
            if (payload.role === "Admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "Error al iniciar sesión. Intente nuevamente.";
            setErrors(errorMessage);
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

                <Button variant={"outline"} className="mt-4 text-blue-600" onClick={() => router.push("/")}>
                    <ArrowLeftIcon /> Inicio
                </Button>


            </div>

            <div className="md:w-1/2 w-full flex items-center justify-center bg-white px-10 py-12">
                <div className="w-full max-w-lg">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                        Inicio de Sesión
                    </h2>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Correo electrónico</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="correo@example.com"
                                                className="h-12 text-lg"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    if (e.target.value.length > 0) setErrors(null);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Contraseña</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="********"
                                                className="h-12 text-lg"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    if (e.target.value.length > 0) setErrors(null);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {errors && (
                                <div className="text-red-500 text-base bg-red-100 p-3 rounded">
                                    {errors}
                                </div>
                            )}

                            <Button type="submit" className="w-full h-12 text-lg">Iniciar Sesión</Button>
                        </form>
                    </Form>

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
