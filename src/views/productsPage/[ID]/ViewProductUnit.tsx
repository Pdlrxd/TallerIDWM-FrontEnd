// Este archivo es /products/[id]/page.tsx (o similar)

import { Product } from "@/interfaces/Product";
import { ProductServices } from "@/services/ProductService";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import ProductDetail from "@/components/shared/product/ProductDetail";

interface ProductPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function ProductUnitPage({ params }: ProductPageProps) {
  const awaitedParams = await params;
  const id = Number(awaitedParams.id);

  console.log("ID recibido en ProductUnitPage:", id);

  if (isNaN(id)) {
    return <div className="p-8 text-center text-red-600">ID inválido.</div>;
  }

  let product: Product | null = null;

  try {
    product = await ProductServices.getProductById(id);
    console.log("Producto recibido en ProductUnitPage:", product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return <div className="p-8 text-center text-red-600">Producto no encontrado.</div>;
  }

  if (!product) {
    return <div className="p-8 text-center">Producto no encontrado.</div>;
  }

  return (
    <>
      <Navbar activePage="/cart" />
      <div className="min-h-screen bg-gray-900 p-6">
        <main className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8 relative">
          <div className="absolute top-6 left-6">
            <BackButton />
          </div>

          <ProductDetail product={product} />

          {/* Aquí puedes agregar el botón de agregar al carrito */}
        </main>
      </div>
    </>
  );
}
