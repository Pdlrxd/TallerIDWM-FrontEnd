import { ApiBackend } from "@/clients/axios";
import { Product } from "@/interfaces/Product";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export interface ProductFilters {
    pageNumber: number;
    pageSize: number;
    category?: string;
    brand?: string;
    condition?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
}


export interface Pagination {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
}

export interface ProductResponseData {
    data: Product[];
    pagination: Pagination;
}

export const ProductServices = {
    async fetchProducts(filters: ProductFilters): Promise<ProductResponseData> {
        const { data } = await ApiBackend.get<ResponseAPI>("product/filter-public", {
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

        return data.data;
    }
}