import { Product } from "@/interfaces/Product";
import { ProductFilters, ProductServices } from "@/services/ProductService";
import { create } from "zustand";

interface Pagination {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
}

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    filters: ProductFilters;
    pagination: Pagination;
    fetchProducts: () => Promise<void>;
    setFilters: (filters: Partial<ProductFilters>) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    loading: false,
    error: null,
    filters: { pageNumber: 1, pageSize: 10 },
    pagination: { totalCount: 0, pageSize: 10, currentPage: 1, totalPages: 1 },
    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const { filters } = get();
            const response = await ProductServices.fetchProducts(filters);

            set({
                products: response.data,
                pagination: response.pagination,
                loading: false,
            });
        } catch (error: any) {
            set({
                loading: false,
                error: error.message || "Error al obtener los productos",
            });
        }
    },
    setFilters: (newFilters) =>
        set((state) => ({
            filters: { ...state.filters, ...newFilters },
        })),
}));
