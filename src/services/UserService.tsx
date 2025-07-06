import { ApiBackend } from "@/services/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { UserFiltersAdmin } from "@/interfaces/UserFiltersAdmin";
import { UserResponseData } from "@/interfaces/UserResponseData";

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
        } catch (error: any) {

            // Si el backend respondió con un JSON conocido, lo devolvemos limpio
            if (error.response?.data) {
                return error.response.data;
            }

            // Si no, enviamos error genérico
            return {
                success: false,
                message: "Error al actualizar perfil",
                data: null,
                errors: null,
                token: null,
            };
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
    static async fetchAdminUsers(filters: any): Promise<any> {
        const token = localStorage.getItem("token"); // Mejor si lo traes desde el Context, te explico abajo

        try {
            const response = await ApiBackend.get("/AdminUser", {
                params: filters,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;  // Devuelve solo la estructura útil
        } catch (error: any) {
            console.error("Error al obtener usuarios:", error);
            throw new Error("No se pudieron obtener los usuarios");
        }
    }

}
