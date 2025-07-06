import { create } from "zustand";
import { Product } from "@/interfaces/Product";
import { ProductFilters, ProductServices } from "@/services/ProductService";
import { ProductReducer } from "./ProductReducer";

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
    set((state) => ProductReducer.setLoading(state, true));
    try {
      const { filters } = get();
      const response = await ProductServices.fetchProducts(filters);
      set((state) =>
        ProductReducer.setProducts(state, response.data, response.pagination)
      );
    } catch (error: any) {
      set((state) =>
        ProductReducer.setError(
          state,
          error.message || "Error al obtener los productos"
        )
      );
    }
  },

  setFilters: (newFilters) =>
    set((state) => ProductReducer.setFilters(state, newFilters)),
}));
