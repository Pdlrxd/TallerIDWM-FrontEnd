"use client"

import { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserService } from "@/services/UserService";
import { AuthContext } from "@/contexts/auth/AuthContext";
import toast from "react-hot-toast";

const formSchema = z.object({
    firstName: z.string().min(3, "Nombre debe tener al menos 3 caracteres."),
    lastName: z.string().min(3, "Apellido debe tener al menos 3 caracteres."),
    email: z.string().email("Correo electrónico inválido."),
    phone: z
        .string()
        .optional()
        .or(z.literal(""))
        .refine(
            (val) => val === undefined || val === "" || /^\+?\d{9,15}$/.test(val),
            "Número telefónico inválido. Debe tener entre 9 y 15 dígitos y puede incluir '+'."
        ),
    birthDate: z
        .string()
        .optional()
        .or(z.literal(""))
        .refine((dateStr) => {
            if (!dateStr) return true;
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return false;
            const today = new Date();
            if (d > today) return false;
            const age = today.getFullYear() - d.getFullYear();
            const monthDiff = today.getMonth() - d.getMonth();
            const dayDiff = today.getDate() - d.getDate();
            if (
                age < 18 ||
                (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
            )
                return false;
            return true;
        }, "Fecha válida y mayor de 18 años requerida."),
    street: z.string().min(1, "Calle es requerida."),
    number: z.string().min(1, "Número es requerido."),
    commune: z.string().min(1, "Comuna es requerida."),
    region: z.string().min(1, "Región es requerida."),
    postalCode: z.string().min(4, "Código postal inválido."),
});

export function ProfilePage() {
    const { user, updateUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            email: user?.email ?? "",
            phone: user?.phone ?? "",
            birthDate: user?.birthDate ? user.birthDate.split("T")[0] : "", // para formato date
            street: user?.street ?? "",
            number: user?.number ?? "",
            commune: user?.commune ?? "",
            region: user?.region ?? "",
            postalCode: user?.postalCode ?? "",
        },
    });

    useEffect(() => {
        form.reset({
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            email: user?.email ?? "",
            phone: user?.phone ?? "",
            birthDate: user?.birthDate ? user.birthDate.split("T")[0] : "",
            street: user?.street ?? "",
            number: user?.number ?? "",
            commune: user?.commune ?? "",
            region: user?.region ?? "",
            postalCode: user?.postalCode ?? "",
        });
    }, [user, form]);

    if (!user) return <div>No estás autenticado.</div>;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("No se encontró token de autenticación.");
            setLoading(false);
            return;
        }

        if (!user) {
            toast.error("Usuario no autenticado.");
            setLoading(false);
            return;
        }

        try {
            const payload = {
                firstName: values.firstName || user.firstName || "",
                lastName: values.lastName || user.lastName || "",
                email: values.email || user.email || "",
                phone: values.phone || user.phone || "",
                birthDate: values.birthDate ? new Date(values.birthDate).toISOString() : user.birthDate || null,
                street: values.street || user.street || "",
                number: values.number || user.number || "",
                commune: values.commune || user.commune || "",
                region: values.region || user.region || "",
                postalCode: values.postalCode || user.postalCode || "",
            };

            const data = await UserService.updateProfile(payload, token);

            if (data.success) {
                toast.success("Perfil actualizado correctamente");

                updateUser({
                    ...user,
                    ...data.data,
                    token: user.token, // Mantén el token actual si no lo devuelve el backend
                });
            } else {
                toast.error(data.message || "Error actualizando perfil");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Error al actualizar perfil");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Perfil {user.firstName}</h1>
                <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => setIsEditing(!isEditing)}
                    aria-label={isEditing ? "Cancelar edición" : "Editar perfil"}
                    disabled={loading}
                    type="button"
                >
                    {/* Ícono lápiz simple SVG */}
                    {isEditing ? (
                        <span>❌</span>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={7}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
                            />
                        </svg>
                    )}
                </button>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm"
                >
                    {/* Ejemplo para el campo Nombre */}
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={!isEditing || loading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Repite para los demás campos */}
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellido</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={!isEditing || loading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correo Electrónico</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} disabled={!isEditing || loading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Teléfono</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="+56912345678"
                                        {...field}
                                        disabled={!isEditing || loading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha de Nacimiento</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} disabled={!isEditing || loading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Calle</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={!isEditing || loading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={!isEditing || loading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="commune"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Comuna</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={!isEditing || loading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="region"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Región</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={!isEditing || loading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Código Postal</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={!isEditing || loading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {isEditing && (
                        <Button
                            type="submit"
                            className="w-full h-10 text-base col-span-full"
                            disabled={loading}
                        >
                            {loading ? "Guardando..." : "Guardar Cambios"}
                        </Button>
                    )}
                </form>
            </Form>
        </div>
    );
}
