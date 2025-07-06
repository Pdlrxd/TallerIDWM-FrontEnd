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
};
