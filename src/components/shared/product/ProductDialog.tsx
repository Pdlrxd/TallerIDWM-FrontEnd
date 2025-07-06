"use client";

import { Product } from "@/interfaces/Product";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface ProductDialogProps {
    product: Product | null;
    open: boolean;
    onClose: () => void;
}

export const ProductDialog = ({ product, open, onClose }: ProductDialogProps) => {
    const router = useRouter();

    if (!product) return null;

    const goToProductDetail = () => {
        onClose();
        router.push(`/products/${product.id}`);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl w-full mx-auto bg-white rounded-lg p-6">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-black">{product.title}</DialogTitle>
                    <DialogDescription>Detalle del Producto</DialogDescription>
                </DialogHeader>

                <div className="flex flex-row gap-8 mt-4">
                    {/* Imagen a la izquierda */}
                    <div className="flex-shrink-0">
                        {product.imageUrls.length > 0 ? (
                            <Image
                                src={product.imageUrls[0]}
                                alt={product.title}
                                width={400}
                                height={400}
                                className="object-contain rounded"
                            />
                        ) : (
                            <Image
                                src="/Producto.jpg"
                                alt={product.title}
                                width={400}
                                height={400}
                                className="object-contain rounded"
                            />
                        )}
                    </div>

                    {/* Info a la derecha */}
                    <div className="flex flex-col flex-grow justify-between">
                        <div>
                            <p className="text-blue-700 font-bold text-3xl">${product.price.toFixed(2)}</p>

                            <p className="text-gray-700 mt-4">{product.description ?? "Sin descripción"}</p>

                            <div className="mt-6 space-y-2 text-gray-800">
                                {product.category && (
                                    <p>
                                        <strong>Categoría:</strong> {product.category}
                                    </p>
                                )}
                                {product.brand && (
                                    <p>
                                        <strong>Marca:</strong> {product.brand}
                                    </p>
                                )}
                                {product.condition && (
                                    <p>
                                        <strong>Estado:</strong> {product.condition}
                                    </p>
                                )}
                                {product.stock !== undefined && (
                                    <p>
                                        <strong>Stock:</strong> {product.stock}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Botón abajo izquierda */}
                        <div className="mt-8 flex justify-start">

                            <Button
                                className="w-40 text-left +ml-0"
                                onClick={goToProductDetail}
                            >
                                Mas Detalles
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
