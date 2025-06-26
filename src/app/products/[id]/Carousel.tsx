"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  alt: string;
}

export default function Carousel({ images, alt }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Si no hay imágenes, mostramos la imagen default
  if (!images || images.length === 0) {
    return (
      <div className="relative w-full max-w-lg mx-auto">
        <div className="overflow-hidden rounded">
          <Image
            src="/Producto.jpg"
            alt={alt}
            width={640}
            height={480}
            className="object-cover w-full rounded"
          />
        </div>
      </div>
    );
  }

  const prev = () => setCurrentIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrentIndex(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="overflow-hidden rounded">
        <Image
          src={images[currentIndex]}
          alt={`${alt} imagen ${currentIndex + 1}`}
          width={640}
          height={480}
          className="object-cover w-full rounded"
        />
      </div>
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full px-2 py-1"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full px-2 py-1"
        aria-label="Siguiente"
      >
        ›
      </button>
      <div className="text-center mt-2 text-sm text-gray-600">
        Imagen {currentIndex + 1} de {images.length}
      </div>
    </div>
  );
}
