import { useState } from "react";
import { OrderService } from "@/services/OrderServices";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "./useCart";

interface ShippingAddress {
    Street: string;
    Number: string;
    Commune: string;
    Region: string;
    PostalCode: string;
}

export const useCheckout = () => {
    const [address, setAddress] = useState<ShippingAddress>({
        Street: "",
        Number: "",
        Commune: "",
        Region: "",
        PostalCode: "",
    });

    const [paymentMethod, setPaymentMethod] = useState<string>("");

    const { fetchCart } = useCart();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const confirmAddress = async () => {
        if (!token) return toast.error("Debes iniciar sesión");
        setLoading(true);
        try {
            await OrderService.confirmAddress(address, token);
            toast.success("Dirección confirmada");
            return true;
        } catch {
            toast.error("Error confirmando dirección");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const confirmPayment = async () => {
        if (!token) return toast.error("Debes iniciar sesión");
        setLoading(true);
        try {
            await OrderService.confirmPayment(paymentMethod, token);
            toast.success("Pago confirmado");
            return true;
        } catch {
            toast.error("Error confirmando pago");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const confirmOrder = async () => {
        if (!token) return toast.error("Debes iniciar sesión");
        setLoading(true);
        try {
            await OrderService.confirmOrder(paymentMethod, address, token);
            toast.success("Pedido realizado");
            await fetchCart(); // Recarga carrito vacío
            router.push("/order/success");
        } catch {
            toast.error("Error confirmando pedido");
        } finally {
            setLoading(false);
        }
    };

    return {
        address,
        setAddress,
        paymentMethod,
        setPaymentMethod,
        loading,
        confirmAddress,
        confirmPayment,
        confirmOrder,
    };
};
