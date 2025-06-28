import { ApiBackend } from "./axios";

interface ShippingAddress {
    Street: string;
    Number: string;
    Commune: string;
    Region: string;
    PostalCode: string;
}

export const OrderService = {
    async confirmAddress(address: ShippingAddress, token: string) {
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

    async confirmOrder(paymentMethod: string, address: ShippingAddress, token: string) {
        return ApiBackend.post(
            "order/checkout/confirm",
            { PaymentMethod: paymentMethod, ShippingAddress: address },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    },
};
