"use client";

import { ProductCard } from "@/components/shared/product/ProductCard";
import { ProductDialog } from "@/components/shared/product/ProductDialog";
import { ProductFilters } from "@/components/shared/product/ProductFilters";
import { Product } from "@/interfaces/Product";
import { useProductStore } from "@/contexts/productContext/ProductContext";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Pagination } from "@/components/ui/pagination";
import { ProductSkeleton } from "@/components/Skeleton";

export default function ViewProductsPage() {
  const { products, loading, fetchProducts, filters, setFilters, pagination } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showLoading, setShowLoading] = useState(true);

  const [localFilters, setLocalFilters] = useState({
    category: filters.category || "",
    brand: filters.brand || "",
    condition: filters.condition || "",
    minPrice: filters.minPrice || "",
    maxPrice: filters.maxPrice || "",
    sort: filters.sort || "",
    pageNumber: filters.pageNumber || 1,
  });

  useEffect(() => {
    setLocalFilters({
      category: filters.category || "",
      brand: filters.brand || "",
      condition: filters.condition || "",
      minPrice: filters.minPrice || "",
      maxPrice: filters.maxPrice || "",
      sort: filters.sort || "",
      pageNumber: filters.pageNumber || 1,
    });
  }, [filters]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading) {
      setShowLoading(true);
    } else {
      timer = setTimeout(() => setShowLoading(false), 1500);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleLocalFilterChange = (key: string, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
      pageNumber: key === "pageNumber" ? value : 1,
    }));
  };

  const applyFilters = () => {
    setFilters({
      ...localFilters,
      category: localFilters.category || undefined,
      brand: localFilters.brand || undefined,
      condition: localFilters.condition || undefined,
      minPrice: localFilters.minPrice !== "" ? Number(localFilters.minPrice) : undefined,
      maxPrice: localFilters.maxPrice !== "" ? Number(localFilters.maxPrice) : undefined,
      sort: localFilters.sort || undefined,
      pageNumber: 1,
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setFilters({ ...filters, pageNumber: newPage });
    }
  };

  if (showLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        {/* Header con imagen y texto */}
        <div className="relative h-64 md:h-96">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/tienda.jpg')" }}
          />
          <div className="absolute inset-0 bg-black opacity-60" />
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Bienvenido a nuestra Tienda</h1>
            <p className="mt-4 text-lg md:text-xl">Explora nuestros productos y ofertas especiales</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-12 px-4 flex gap-8">
          {/* Filtros laterales */}
          <ProductFilters
            filters={localFilters}
            onFilterChange={handleLocalFilterChange}
            onApplyFilters={applyFilters}
          />
          {/* Skeleton grid */}
          <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </section>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="relative h-64 md:h-96">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/tienda.jpg')" }} />
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Bienvenido a nuestra Tienda</h1>
          <p className="mt-4 text-lg md:text-xl">Explora nuestros productos y ofertas especiales</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 flex gap-8">
        {/* Filtros laterales */}
        <ProductFilters
          filters={localFilters}
          onFilterChange={handleLocalFilterChange}
          onApplyFilters={applyFilters}
        />

        {/* Productos */}
        <section
          key={products.length}
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {products.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">
              No se encontraron productos con esos filtros.
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))
          )}
        </section>


      </div>

      {/* Paginación */}
      <footer className="max-w-7xl mx-auto py-6 px-4">
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </footer>

      {/* Modal de producto */}
      <ProductDialog
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
