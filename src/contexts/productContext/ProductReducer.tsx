import { Product } from "@/interfaces/Product";
import { ProductFilters } from "@/services/ProductService";

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
}

export const ProductReducer = {
  setLoading: (state: ProductState, loading: boolean): ProductState => ({
    ...state,
    loading,
  }),

  setError: (state: ProductState, error: string | null): ProductState => ({
    ...state,
    error,
    loading: false,
  }),

  setProducts: (
    state: ProductState,
    products: Product[],
    pagination: Pagination
  ): ProductState => ({
    ...state,
    products,
    pagination,
    loading: false,
  }),

  setFilters: (
    state: ProductState,
    newFilters: Partial<ProductFilters>
  ): ProductState => ({
    ...state,
    filters: { ...state.filters, ...newFilters },
  }),
};
