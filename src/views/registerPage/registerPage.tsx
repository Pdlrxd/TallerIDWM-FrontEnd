"use client";

import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z
  .object({
    firstName: z.string().min(3, { message: "Nombre debe tener al menos 3 caracteres." }),
    lastName: z.string().min(3, { message: "Apellido debe tener al menos 3 caracteres." }),
    email: z.string().email({ message: "Ingrese un correo electrónico válido." }),
    phone: z
      .string()
      .regex(/^\+?\d{9,15}$/, {
        message: "Número telefónico inválido. Debe tener entre 9 y 15 dígitos y puede incluir '+'.",
      }),
    birthDate: z.string().refine(
      (dateStr) => {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return false;
        const today = new Date();
        if (d > today) return false;
        const age = today.getFullYear() - d.getFullYear();
        const monthDiff = today.getMonth() - d.getMonth();
        const dayDiff = today.getDate() - d.getDate();
        if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) return false;
        return true;
      },
      { message: "Fecha de nacimiento válida y mayor de 18 años requerida." }
    ),
    password: z
      .string()
      .min(8, { message: "Contraseña debe tener mínimo 8 caracteres." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`]).+$/, {
        message: "Contraseña debe tener mayúscula, minúscula, número y carácter especial.",
      }),
    confirmPassword: z.string(),
    street: z.string().optional(),
    number: z
      .string()
      .regex(/^\d*$/, { message: "El número debe contener solo dígitos." })
      .optional(),
    commune: z.string().optional(),
    region: z.string().optional(),
    postalCode: z
      .string()
      .regex(/^\d*$/, { message: "El código postal debe contener solo dígitos." })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export const RegisterPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Datos enviados al backend:", values);

      const { data } = await ApiBackend.post<ResponseAPI>("auth/register", values);

      if (data.success === false) {
        toast.error(data.message || "Error al registrar el usuario.", {
          style: {
            background: "#5b21b6",
            color: "white",
          },
        });
        return;
      }

      toast.success(data.message || "Registro exitoso.", {
        iconTheme: {
          primary: "#10b981",
          secondary: "white",
        },
        style: {
          background: "#5b21b6",
          color: "white",
        },
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Error en el registro. Intente nuevamente.";
      toast.error(errorMessage, {
        style: {
          background: "#5b21b6",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4 py-10">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative">
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="absolute top-4 left-4 w-10 h-10 bg-gray-700 rounded-full flex justify-center items-center shadow-md hover:bg-gray-600 transition"
          aria-label="Volver al login"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-900">Registro de Usuario</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm"
          >
            {/* Columna izquierda */}
            <>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input className="text-sm h-9" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input className="text-sm h-9" placeholder="" {...field} />
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
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input className="text-sm h-9" type="email" placeholder="correo@example.com" {...field} />
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
                    <FormLabel>Número telefónico</FormLabel>
                    <FormControl>
                      <Input className="text-sm h-9" placeholder="+56912345678" {...field} />
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
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl>
                      <Input className="text-sm h-9" type="date" {...field} />
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
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input className="text-sm h-9" type="password" placeholder="********" {...field} />
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">
                      Mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>

            {/* Columna derecha */}
            <>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input className="text-sm h-9" type="password" placeholder="********" {...field} />
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
                      <Input className="text-sm h-9" placeholder="" {...field} />
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
                      <Input className="text-sm h-9" placeholder="" {...field} />
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
                      <Input className="text-sm h-9" placeholder="" {...field} />
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
                      <Input className="text-sm h-9" placeholder="" {...field} />
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
                    <FormLabel>Código postal</FormLabel>
                    <FormControl>
                      <Input className="text-sm h-9" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full h-10 text-base col-span-full">
                Registrarse
              </Button>
            </>
          </form>
        </Form>
      </div>
    </div>
  );
};
