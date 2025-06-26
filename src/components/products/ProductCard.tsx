import { Product } from '../../interfaces/Product';
import Image from 'next/image';
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
}
export const ProductCard = ({ product, onClick }: ProductCardProps) => {
    return (
        <div
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition flex flex-col"
            onClick={onClick}
            style={{ width: "100%" }}
        >
            <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
                <Image
                    src={product.imageUrls[0] ?? "/Producto.jpg"}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="object-contain"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow min-h-[180px]">
                <h3 className="font-semibold text-lg truncate">{product.title}</h3>
                <p className="mt-2 text-blue-700 font-bold text-xl">${product.price.toFixed(2)}</p>
                <div className="mt-auto">
                    <Button className="w-full">Mas Detalles</Button>
                </div>
            </div>
        </div>
    );
};
