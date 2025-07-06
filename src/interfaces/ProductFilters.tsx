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