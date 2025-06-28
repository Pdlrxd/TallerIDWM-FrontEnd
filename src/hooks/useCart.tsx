import { useState, useEffect } from "react";
import { CartService } from "@/services/CartService";
import { useRouter } from "next/navigation";
import { CartItem } from "@/interfaces/CartItem";
import toast from "react-hot-toast";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      setLoading(true);
      const res = await CartService.getCart(token);
      if (res.success && res.data) {
        setCartItems(res.data.items || []);
        setTotal(res.data.total || 0);
      } else {
        toast.error(res.message || "Error al cargar el carrito");
      }
    } catch {
      toast.error("Error al cargar el carrito");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return { cartItems, total, loading, fetchCart };
};
