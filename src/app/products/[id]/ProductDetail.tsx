"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Carousel from "./Carousel";
import { AddToCartButton } from "./AddToCartButton";
import { Product } from "@/interfaces/Product";

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const maxStock = product.stock ?? 0;

  const increment = () => {
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
      setError(null);
    } else {
      setError("No puedes superar el stock disponible.");
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setError(null);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-10 text-center">{product.title}</h1>

      <div className="flex flex-col md:flex-row gap-x-8">
        <div className="md:w-1/2 mb-6 md:mb-0">
          {product.imageUrls.length === 1 ? (
            <Image
              src={product.imageUrls[0]}
              alt={product.title}
              width={640}
              height={480}
              className="rounded object-cover w-full h-auto"
            />
          ) : (
            <Carousel images={product.imageUrls} alt={product.title} />
          )}
        </div>

        <div className="md:w-1/2 flex flex-col justify-between">
          <div className="space-y-6">
            <p className="text-2xl font-semibold text-green-700">
              ${product.price.toFixed(0)} CLP
            </p>
            <p className="text-lg">{product.description}</p>
            <p>
              <strong>Stock:</strong>{" "}
              {product.stock !== undefined ? (
                <span className="bg-red-600/80 text-white px-3 py-1 rounded-full text-sm ml-2">
                  {product.stock}
                </span>
              ) : (
                "Sin información"
              )}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-5">
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={decrement}
                className="bg-gray-300 px-6 py-3 rounded text-xl hover:bg-gray-400"
                aria-label="Disminuir cantidad"
              >
                -
              </button>
              <span className="text-2xl font-bold select-none">{quantity}</span>
              <button
                onClick={increment}
                className="bg-gray-300 px-6 py-3 rounded text-xl hover:bg-gray-400"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

            {error && (
              <p className="text-red-600 text-base font-medium select-none">{error}</p>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            {product.id !== undefined && (
              <AddToCartButton productId={product.id} quantity={quantity} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
