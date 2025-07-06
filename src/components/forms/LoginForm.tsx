"use client";

import { Button } from "@/components/ui/Button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Ingrese un correo electrónico válido." }).nonempty({ message: "Email es requerido." }),
  password: z.string().nonempty({ message: "Contraseña es requerida." }),
});

type LoginData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (values: LoginData) => Promise<void>;
  serverError?: string | null;
  clearError: () => void;
}

export const LoginForm = ({ onSubmit, serverError, clearError }: LoginFormProps) => {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
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
                    if (e.target.value.length > 0) clearError();
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
                    if (e.target.value.length > 0) clearError();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {serverError && (
          <div className="text-red-500 text-base bg-red-100 p-3 rounded">
            {serverError}
          </div>
        )}

        <Button type="submit" className="w-full h-12 text-lg">
          Iniciar Sesión
        </Button>
      </form>
    </Form>
  );
};
