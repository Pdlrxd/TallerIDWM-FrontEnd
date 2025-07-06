import { ApiBackend } from "@/services/axios";
import { Product } from "@/interfaces/Product";
import { ProductFilters } from "@/interfaces/ProductFilters";
import { ProductResponseData } from "@/interfaces/ProductResponseData";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { ProductFiltersAdmin } from "@/interfaces/ProductFiltersAdmin";

export const ProductServices = {
    async fetchProducts(filters: ProductFilters): Promise<ProductResponseData> {
        const { data } = await ApiBackend.get<ResponseAPI>("product/filter-public", {
            params: filters,
        });

        if (!data.success) throw new Error(data.message || "Error al obtener los productos");

        return data.data;
    },

    async getProductById(id: number): Promise<Product> {
        const { data } = await ApiBackend.get<Product>(`product/${id}`);

        if (!data) throw new Error("Producto no encontrado");

        return data;
    },
    async fetchAdminProducts(filters: ProductFiltersAdmin): Promise<ProductResponseData> {
        console.log("Enviando filtros a backend:", filters);
        const { data } = await ApiBackend.get<ResponseAPI>("product/filter", {
            params: filters,
        });

        if (!data.success) throw new Error(data.message || "Error al obtener los productos de admin");

        return data.data;
    }

};
export type { ProductFilters };

