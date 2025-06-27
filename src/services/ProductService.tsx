import { ApiBackend } from "@/services/axios";
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

        if (!data.success) throw new Error(data.message || "Error al obtener los productos");

        return data.data;
    },

    async getProductById(id: number): Promise<Product> {
        const { data } = await ApiBackend.get<Product>(`product/${id}`);

        if (!data) throw new Error("Producto no encontrado");

        return data;
    }


};
