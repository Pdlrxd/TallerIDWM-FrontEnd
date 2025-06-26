"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";

export function AddToCartButton() {
  const router = useRouter();
  const { status } = useContext(AuthContext);

  const handleAddToCart = () => {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }

    // Aquí agregas la lógica real para añadir al carrito
    alert("Producto agregado al carrito");
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3"
    >
      Agregar al carrito
    </Button>
  );
}
