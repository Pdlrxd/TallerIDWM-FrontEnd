"use client";

import { Button } from "@/components/ui/Button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const registerSchema = z
    .object({
        firstName: z.string().min(3, { message: "Nombre debe tener al menos 3 caracteres." }),
        lastName: z.string().min(3, { message: "Apellido debe tener al menos 3 caracteres." }),
        email: z.string().email({ message: "Ingrese un correo electrónico válido." }),
        phone: z.string().regex(/^\+?\d{9,15}$/, { message: "Número telefónico inválido." }),

        birthDate: z.string().refine((dateStr) => {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return false;

            const today = new Date();
            // Normalizamos ambas fechas al inicio del día
            d.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            // Fecha no puede ser futura
            if (d > today) return false;

            // Cálculo de edad
            const age = today.getFullYear() - d.getFullYear();
            const monthDiff = today.getMonth() - d.getMonth();
            const dayDiff = today.getDate() - d.getDate();

            // Debe tener 18 años o más
            return !(age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0))));
        }, { message: "Debe ser mayor de 18 años y la fecha no puede ser en el futuro." }),

        password: z.string()
            .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`]).+$/, {
                message: "La contraseña debe contener mayúscula, minúscula, número y carácter especial.",
            }),

        confirmPassword: z.string(),

        street: z.string().optional(),
        number: z.string().regex(/^\d*$/, { message: "Solo dígitos." }).optional(),
        commune: z.string().optional(),
        region: z.string().optional(),
        postalCode: z.string().regex(/^\d*$/, { message: "Solo dígitos." }).optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden.",
        path: ["confirmPassword"],
    });


type RegisterData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
    onSubmit: (values: RegisterData) => Promise<void>;
}

export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
    const form = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            birthDate: "",
            password: "",
            confirmPassword: "",
            street: "",
            number: "",
            commune: "",
            region: "",
            postalCode: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <FormField control={form.control} name="firstName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl><Input className="text-sm h-9" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="lastName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl><Input className="text-sm h-9" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl><Input className="text-sm h-9" type="email" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl><Input className="text-sm h-9" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="birthDate" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Fecha de nacimiento</FormLabel>
                        <FormControl><Input className="text-sm h-9" type="date" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl><Input className="text-sm h-9" type="password" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirmar Contraseña</FormLabel>
                        <FormControl><Input className="text-sm h-9" type="password" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="street" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Calle</FormLabel>
                        <FormControl><Input className="text-sm h-9" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="number" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl><Input className="text-sm h-9" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="commune" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Comuna</FormLabel>
                        <FormControl><Input className="text-sm h-9" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="region" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Región</FormLabel>
                        <FormControl><Input className="text-sm h-9" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="postalCode" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Código Postal</FormLabel>
                        <FormControl><Input className="text-sm h-9" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <Button type="submit" className="w-full h-10 text-base col-span-full">
                    Registrarse
                </Button>
            </form>
        </Form>
    );
};
