import { Product } from "@/interfaces/Product";
import { ProductServices } from "@/services/ProductService";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import ProductDetail from "./ProductDetail";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return <div className="p-8 text-center text-red-600">ID inválido.</div>;
  }

  let product: Product | null = null;

  try {
    product = await ProductServices.getProductById(id);
  } catch (error) {
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
          <div className="absolute top-6 left-6">
            <BackButton />
          </div>

          <ProductDetail product={product} />
        </main>
      </div>
    </>
  );
}
