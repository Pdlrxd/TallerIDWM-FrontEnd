import { ApiBackend } from "./axios";

export const AdminService = {
    createProduct: async (formData: FormData, token: string) => {
        try {
            const response = await ApiBackend.post("/product", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || "Error al crear el producto"
            );
        }
    },
    fetchUsers: async (filters: {
        name?: string;
        status?: boolean;
        startDate?: string;
        endDate?: string;
        pageNumber: number;
        pageSize: number;
    }) => {
        try {
            const response = await ApiBackend.get("/AdminUser", {
                params: filters,
            });
            if (!response.data.success) {
                throw new Error(response.data.message || "Error al obtener usuarios");
            }
            return response.data.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Error en la solicitud");
        }
    },
};
