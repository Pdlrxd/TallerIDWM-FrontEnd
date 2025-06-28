"use client";

import { useAuth } from "@/hooks/userAuth";
import { RegisterForm, registerSchema } from "@/components/forms/RegisterForm";
import toast from "react-hot-toast";
import { z } from "zod";

export const RegisterPage = () => {
  const { register } = useAuth();

  const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
    const { success, message, error } = await register(values);

    if (!success) {
      toast.error(error || "Error al registrar el usuario.", {
        style: { background: "#5b21b6", color: "white" },
      });
      return;
    }

    toast.success(message || "Registro exitoso.", {
      iconTheme: { primary: "#10b981", secondary: "white" },
      style: { background: "#5b21b6", color: "white" },
    });

    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4 py-10">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative">
        <button
          type="button"
          onClick={() => (window.location.href = "/login")}
          className="absolute top-4 left-4 w-10 h-10 bg-gray-700 rounded-full flex justify-center items-center shadow-md hover:bg-gray-600 transition"
          aria-label="Volver al login"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-900">Registro de Usuario</h2>
        <RegisterForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
