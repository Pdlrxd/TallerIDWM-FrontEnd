import { ApiBackend } from "./axios";
import { Address } from "@/interfaces/Address";

export const OrderService = {

    async confirmAddress(address: Address, token: string) {
        return ApiBackend.post("order/checkout/address", address, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    async confirmPayment(paymentMethod: string, token: string) {
        return ApiBackend.post(
            "order/checkout/payment",
            { PaymentMethod: paymentMethod },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    },

    async confirmOrder(paymentMethod: string, address: Address, token: string) {
        return ApiBackend.post(
            "order/checkout/confirm",
            {
                PaymentMethod: paymentMethod,
                ShippingAddress: address,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    },
};
