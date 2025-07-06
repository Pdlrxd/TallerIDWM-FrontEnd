import { Product } from "./Product";
import { Pagination } from "./Pagination";

export interface ProductResponseData {
  data: Product[];
  pagination: Pagination;
}
