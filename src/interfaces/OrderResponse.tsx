import { Order } from "./Order";

export interface OrderResponseData {
  pageNumber: number;
  pageSize: number;
  totalOrders: number;
  orders: Order[];
}
