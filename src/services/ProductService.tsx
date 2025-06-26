import { ApiBackend } from "@/clients/axios";
import { Product } from "@/interfaces/Product";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export interface ProductFilters {
    pageNumber: number;
    pageSize: number;
}

export const ProductServices = {

    async fetchProducts(filters: ProductFilters) {
        const { data } = await ApiBackend.get<ResponseAPI>("product/shop", {
            params: filters
        });

        if (!data.success) {
            throw new Error(data.message || "Error al obtener los productos");
        }

        if (!data.data || !Array.isArray(data.data.data)) {
            throw new Error("No se encontraron productos");
        }

        if (data.errors) {
            console.error("Errors:", data.errors);
        }

        return data.data.data as Product[];
    }


}