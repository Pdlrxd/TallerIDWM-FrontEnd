"use client";

import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { CartService } from "@/services/CartService";
import { Button } from "@/components/ui/Button";

interface AddToCartButtonProps {
  productId: number;
  quantity: number;
  stock: number;
}

export function AddToCartButton({ productId, quantity, stock }: AddToCartButtonProps) {
  const { cartItems, fetchCart } = useCart();
  const router = useRouter();
  const { status } = useContext(AuthContext);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token") || "";
    setToken(savedToken);
  }, []);

  const handleAddToCart = async () => {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }

    if (!token) {
      toast.error("Token no encontrado, inicia sesión nuevamente.");
      router.push("/login");
      return;
    }

    const existingItem = cartItems.find(item => item.productId === productId);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const newTotalQuantity = currentQuantity + quantity;

    if (newTotalQuantity > stock) {
      toast.error(`No puedes agregar más de ${stock} unidades (ya tienes ${currentQuantity} en el carrito).`);
      return;
    }

    try {
      await CartService.addToCart(productId, quantity, token);
      toast.success("Producto agregado al carrito");
      await fetchCart();
    } catch (error) {
      console.error("Error al agregar al carrito", error);
      toast.error("Error al agregar al carrito");
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="text-white bg-green-600 hover:bg-green-700 shadow-lg rounded-lg px-6 py-3 text-base font-semibold transition"
    >
      Agregar al carrito
    </Button>
  );
}
