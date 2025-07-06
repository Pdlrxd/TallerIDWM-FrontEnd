import { ApiBackend } from "./axios";
import { OrderResponseData } from "@/interfaces/OrderResponse";
import { OrderDetail } from "@/interfaces/OrderDetail";

export const HistoryOrderService = {

    async fetchOrders(page: number, pageSize: number, token: string): Promise<OrderResponseData> {
        const { data } = await ApiBackend.get(`/HistoryOrder/list?pageNumber=${page}&pageSize=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!data.success) throw new Error(data.message || "Error al obtener historial");

        return data.data;
    },

    async fetchOrderById(orderId: string, token: string): Promise<OrderDetail> {
        const { data } = await ApiBackend.get(`/HistoryOrder/details/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!data.success) throw new Error(data.message || "Error al obtener detalle de pedido");

        return data.data;
    },
};
