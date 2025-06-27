import { ApiBackend } from "@/services/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export class UserService {
    static async login(email: string, password: string): Promise<ResponseAPI> {
        try {
            const response = await ApiBackend.post<ResponseAPI>("auth/login", { email, password });
            return response.data;
        } catch (error: any) {

            if (error.response) {
                return {
                    success: false,
                    message: error.response.data?.message || "Correo o contraseña incorrectos.",
                    data: null,
                    errors: null,
                };
            }

            return {
                success: false,
                message: "Error al conectar con el servidor.",
                data: null,
                errors: null,
            };
        }
    }

    static async getProfile(token: string) {
        try {
            const response = await ApiBackend.get("user/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            console.error("Error obteniendo perfil:", error);
            return { success: false, message: "Error al obtener perfil" };
        }
    }

    static async updateProfile(data: any, token: string) {
        try {
            const response = await ApiBackend.patch("user/me", data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            console.error("Error actualizando perfil:", error);
            return { success: false, message: "Error al actualizar perfil" };
        }
    }

    static async register(data: any): Promise<ResponseAPI> {
        try {
            const response = await ApiBackend.post<ResponseAPI>("auth/register", data);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data?.message || "Error al registrar usuario.",
                    data: null,
                    errors: null,
                };
            }
            return {
                success: false,
                message: "Error al conectar con el servidor.",
                data: null,
                errors: null,
            };
        }
    }
}
