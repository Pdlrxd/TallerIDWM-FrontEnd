"use client";

import { useEffect, useState } from "react";
import { Product } from "@/interfaces/Product";
import { ProductFiltersAdmin } from "@/interfaces/ProductFiltersAdmin";
import { ProductServices } from "@/services/ProductService";
import ProductFiltersComponent from "@/components/products/ProductFilters";
import ProductCard from "@/components/products/ProductCard";
import { Pagination } from "@/components/ui/pagination";
import { AuthGuardAdmin } from "@/components/AuthGuardAdmin";
import { Navbar } from "@/components/Navbar";

const ViewAdminProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<ProductFiltersAdmin>({});
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchProducts = async () => {
        try {
            const filtersWithPage = { ...filters, PageNumber: currentPage };

            const res = await ProductServices.fetchAdminProducts(filtersWithPage);
            setProducts(res.data);
            setTotalPages(res.pagination.totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [filters, currentPage]);

    const handleFilterChange = (updatedFilters: ProductFiltersAdmin) => {
        setFilters(updatedFilters);
        setCurrentPage(1); // resetear a página 1 al cambiar filtro
    };

    return (
        <AuthGuardAdmin>
            <div className="flex flex-col min-h-screen">
                <Navbar />

                <div className="p-4 flex flex-col md:flex-row gap-4">
                    <aside className="w-full md:w-1/4">
                        <ProductFiltersComponent filters={filters} onFilterChange={handleFilterChange} />
                    </aside>

                    <main className="w-full md:w-3/4">
                        <h1 className="text-3xl font-bold mb-4">Listado de Productos</h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="mt-6 flex justify-center">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </main>
                </div>
            </div>
        </AuthGuardAdmin>
    );
};

export default ViewAdminProductList;
