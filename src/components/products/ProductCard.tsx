import { Product } from "@/interfaces/Product";
import Image from "next/image";

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    return (
        <div className="border rounded-lg shadow p-4 flex flex-col bg-white">
            {product.imageUrls?.[0] ? (
                <Image
                    src={product.imageUrls[0]}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="object-cover w-full h-40 mb-2 rounded"
                />
            ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-2 rounded">
                    <span>Sin imagen</span>
                </div>
            )}

            <h2 className="font-bold text-lg">{product.title}</h2>
            <p className="text-gray-700 text-sm mb-2">{product.category} - {product.brand}</p>
            <p className="font-semibold text-green-600">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            <p className="text-sm text-gray-500">Estado: {product.condition}</p>
        </div>
    );
};

export default ProductCard;
