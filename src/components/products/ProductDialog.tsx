import { Product } from "@/interfaces/Product";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";

interface ProductDialogProps {
    product: Product | null;
    open: boolean;
    onClose: () => void;
}

export const ProductDialog = ({ product, open, onClose }: ProductDialogProps) => {
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl w-full mx-auto">
                <DialogHeader>
                    <DialogTitle>{product.title}</DialogTitle>
                    <DialogDescription>Detalle del Producto</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-4">
                    {product.imageUrls.length > 0 ? (
                        <Image
                            src={product.imageUrls[0]}
                            alt={product.title}
                            width={300}
                            height={300}
                            className="object-contain rounded"
                        />
                    ) : (
                        <Image
                            src="/Producto.jpg"
                            alt={product.title}
                            width={300}
                            height={300}
                            className="object-contain rounded"
                        />
                    )}

                    <p className="text-blue-700 font-bold text-3xl mt-4">
                    ${product.price.toFixed(2)}
                    </p>

                    <p className="text-gray-700 text-center">{product.description ?? "Sin descripción"}</p>

                    <div className="w-full mt-4 space-y-1 text-gray-800">
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
            </DialogContent>
        </Dialog>
    );
};
