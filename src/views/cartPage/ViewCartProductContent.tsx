"use client"

import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { RemoveFromCartButton } from "@/components/shared/cartL/RemoveFromCartButton";

export const ViewCartProductContent = () => {
  const { cartItems, total, loading } = useCart();

  if (loading)
    return <div className="text-center py-10 text-white">Cargando carrito...</div>;

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-black">
        <h2 className="text-5xl font-bold mb-6">Tu carrito está vacío</h2>
        <Button
          onClick={() => (window.location.href = "/")}
          className="px-12 py-3 text-2xl font-bold max-w-xs mx-auto bg-gray-200 text-black hover:bg-gray-300"
        >
          Explorar Productos
        </Button>
      </div>
    );



  return (
    <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg p-8 text-black">
      <h1 className="text-4xl font-extrabold uppercase mb-8 text-center">CARRITO</h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-center bg-gray-100 rounded-lg p-5 shadow"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={120}
              height={120}
              className="rounded object-cover flex-shrink-0"
            />

            <div className="ml-6 flex flex-col justify-center flex-grow">
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="mt-1">
                Cantidad: <span className="font-medium">{item.quantity}</span>
              </p>
              <p className="mt-1">
                Precio Unitario:{" "}
                <span className="font-medium">${item.price.toFixed(2)}</span>
              </p>
            </div>

            <div className="ml-auto text-right flex items-center gap-4">
              <p className="text-2xl font-bold">${item.subtotal.toFixed(2)}</p>
              <RemoveFromCartButton productId={item.productId} />
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-10 border-t border-gray-300 pt-6">
        <p className="text-3xl font-extrabold">Total: ${total.toFixed(2)}</p>
        <Button
          className="mt-6 px-8 py-3 text-lg"
          onClick={() => window.location.href = "/checkout"}
        >
          Finalizar Compra
        </Button>


      </div>
    </div>
  );
};
