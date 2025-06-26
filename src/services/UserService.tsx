import { ApiBackend } from "@/clients/axios";

export class UserService {

    static async getProfile(token: string) {
        try {
            const response = await ApiBackend.get("user/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // Debe devolver un objeto tipo { success: boolean, data: User }
        } catch (error) {
            console.error("Error obteniendo perfil:", error);
            return { success: false, message: "Error al obtener perfil" };
        }
    }

    static async updateProfile(data: any, token: string) {
        const response = await ApiBackend.patch("user/me", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;  // Ahora espera { success, data, token? }
    }
    
}
