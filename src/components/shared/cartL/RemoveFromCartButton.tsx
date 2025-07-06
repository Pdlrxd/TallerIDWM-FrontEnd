"use client";

import { useCart } from "@/hooks/useCart";
import { CartService } from "@/services/CartService";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

interface Props {
    productId: number;
}

export function RemoveFromCartButton({ productId }: Props) {
    const { fetchCart } = useCart();
    const router = useRouter();
    const { status } = useContext(AuthContext);
    const [token, setToken] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedToken = localStorage.getItem("token") || "";
        setToken(savedToken);
    }, []);

    const handleRemove = async () => {
        if (status !== "authenticated") {
            router.push("/login");
            return;
        }

        if (!token) {
            toast.error("Token no encontrado, inicia sesión nuevamente.");
            router.push("/login");
            return;
        }

        try {
            setLoading(true);
            await CartService.removeFromCart(productId, token);
            toast.success("Producto eliminado del carrito");
            await fetchCart();
        } catch (error) {
            console.error("Error al eliminar del carrito", error);
            toast.error("Error al eliminar del carrito");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleRemove}
            variant="destructive"
            size="icon"
            className="ml-2"
            aria-label="Eliminar del carrito"
            disabled={loading}
        >
            <Trash2 className="w-4 h-4" />
        </Button>
    );
}
