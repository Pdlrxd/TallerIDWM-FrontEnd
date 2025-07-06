import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { UserService } from "@/services/UserService";
import toast from "react-hot-toast";

export const formSchema = z.object({
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

export function useProfile() {
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
      birthDate: user?.birthDate ? user.birthDate.split("T")[0] : "",
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
  }, [user]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast.error("Usuario no autenticado.");
      return;
    }
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No se encontró token de autenticación.");
      setLoading(false);
      return;
    }
    try {
      const payload = {
        firstName: values.firstName || user.firstName || "",
        lastName: values.lastName || user.lastName || "",
        email: values.email || user.email || "",
        phone: values.phone || user.phone || "",
        birthDate: values.birthDate
          ? new Date(values.birthDate).toISOString()
          : user.birthDate || null,
        street: values.street || user.street || "",
        number: values.number || user.number || "",
        commune: values.commune || user.commune || "",
        region: values.region || user.region || "",
        postalCode: values.postalCode || user.postalCode || "",
      };

      const data = await UserService.updateProfile(payload, token);

      if (data.success) {
        toast.success("Perfil actualizado correctamente");

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        updateUser({
          ...user,
          ...data.data,
          token: data.token ?? user.token,
        });
      } else {
        toast.error(data.message || "Error actualizando perfil");

        if (data.token) {
          localStorage.setItem("token", data.token);
          updateUser({
            ...user,
            ...data.data,
            token: data.token,
          });
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error al actualizar perfil");
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    loading,
    isEditing,
    setIsEditing,
    onSubmit,
    user,
  };
}
