"use client";

import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  isLoggedIn: boolean;
}

export function AddToCartButton({ isLoggedIn }: AddToCartButtonProps) {
  const router = useRouter();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    // Aquí agregas lógica para carrito
    alert("Producto agregado al carrito");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition"
    >
      Agregar al carrito
    </button>
  );
}
