import { Product } from "@/interfaces/Product";
import { ProductServices } from "@/services/ProductService";
import Image from "next/image";
import Carousel from "./Carousel";
import { AddToCartButton } from "./AddToCartButton";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  console.log("params:", params);

  const id = Number(params.id);
  console.log("ID convertido:", id);

  if (isNaN(id)) {
    return <div className="p-8 text-center text-red-600">ID inválido.</div>;
  }

  let product: Product | null = null;

  try {
    product = await ProductServices.getProductById(id);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return <div className="p-8 text-center text-red-600">Producto no encontrado.</div>;
  }

  if (!product) {
    return <div className="p-8 text-center">Producto no encontrado.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 p-6">
        <main className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8 relative">
          
          {/* Botón volver */}
          <div className="absolute top-6 left-6">
            <BackButton />
          </div>

          {/* Título centrado */}
          <h1 className="text-3xl font-bold mb-6 text-center">{product.title}</h1>

          <div className="mb-8">
            {product.imageUrls.length === 1 ? (
              <Image
                src={product.imageUrls[0]}
                alt={product.title}
                width={640}
                height={480}
                className="rounded"
              />
            ) : (
              <Carousel images={product.imageUrls} alt={product.title} />
            )}
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-xl font-semibold text-green-700">
              ${product.price.toFixed(0)} CLP
            </p>
            <p>{product.description}</p>
            <p>
              <strong>Stock:</strong> {product.stock ?? "Sin información"}
            </p>
          </div>

          <AddToCartButton />
        </main>
      </div>
    </>
  );
}
