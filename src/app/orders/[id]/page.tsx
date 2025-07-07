"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { HistoryOrderService } from "@/services/HistoryOrderService";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { Navbar } from "@/components/Navbar";
import { OrderDetail } from "@/interfaces/OrderDetail";
import { AuthGuardClient } from "@/components/AuthGuardClient";

function ViewOrderDetail() {
    const { id } = useParams();
    const router = useRouter();
    const { token } = useContext(AuthContext);
    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!token || !id) return;
            setLoading(true);
            try {
                const res = await HistoryOrderService.fetchOrderById(id as string, token);
                setOrder(res);
            } catch (error) {
                console.error("Error cargando detalle del pedido:", error);
            }
            setLoading(false);
        };

        fetchOrder();
    }, [id, token]);

    const formatDate = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    };

    if (loading) return <p className="text-center mt-20">Cargando detalle...</p>;
    if (!order) return <p className="text-center mt-20">No se encontró el pedido.</p>;

    return (
        <>
            <Navbar activePage="/profile" />

            <main className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg text-black mt-8">
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded mb-4"
                    >
                        ← Volver atrás
                    </button>
                </div>

                <h1 className="text-3xl font-bold mb-6">Detalle del Pedido</h1>

                <section className="mb-6">
                    <p>
                        <strong>Número de Pedido:</strong> {order.orderNumber}
                    </p>
                    <p>
                        <strong>Fecha de Compra:</strong> {formatDate(order.purchaseDate)}
                    </p>
                    <p>
                        <strong>Total:</strong> ${order.total.toFixed(2)}
                    </p>
                    <p>
                        <strong>Estado:</strong> {order.orderStatus}
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Dirección de Envío</h2>
                    <p>
                        {order.shippingAddress.street} #{order.shippingAddress.number}
                    </p>
                    <p>
                        {order.shippingAddress.commune}, {order.shippingAddress.region}
                    </p>
                    <p>Código Postal: {order.shippingAddress.postalCode}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Productos</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Producto</th>
                                <th className="border border-gray-300 px-4 py-2">Cantidad</th>
                                <th className="border border-gray-300 px-4 py-2">Precio Unitario</th>
                                <th className="border border-gray-300 px-4 py-2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.products.map((product) => (
                                <tr key={product.productId} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{product.title}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{product.quantity}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">${product.unitPrice.toFixed(2)}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">${product.subtotal.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    );
}

export default function ViewOrderDetailPage() {
    return (
        <AuthGuardClient>
            <ViewOrderDetail />
        </AuthGuardClient>
    );
}
