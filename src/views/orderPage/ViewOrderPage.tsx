"use client";

import { useEffect, useContext, useState } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { HistoryOrderService } from "@/services/HistoryOrderService";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";

interface Order {
    id: number;
    orderNumber: string;
    purchaseDate: string;
    total: number;
    orderStatus: string;
    detailsUrl: string;
}

export function ViewOrdersPage() {
    const { token } = useContext(AuthContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    // filtros
    const [searchDate, setSearchDate] = useState("");
    const [searchTotal, setSearchTotal] = useState("");

    // paginación
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const getOrders = async () => {
            if (!token) return;
            setLoading(true);
            try {
                const res = await HistoryOrderService.fetchOrders(pageNumber, pageSize, token);
                let filteredOrders = res.orders;

                // filtro total mínimo
                if (searchTotal) {
                    const minTotal = parseFloat(searchTotal);
                    if (!isNaN(minTotal)) {
                        filteredOrders = filteredOrders.filter((o) => o.total >= minTotal);
                    }
                }
                // filtro fecha exacta o parcial (YYYY-MM-DD)
                if (searchDate) {
                    filteredOrders = filteredOrders.filter((o) => o.purchaseDate.startsWith(searchDate));
                }

                setOrders(filteredOrders);
            } catch (error) {
                console.error("Error cargando pedidos:", error);
                setOrders([]);
            }
            setLoading(false);
        };

        getOrders();
    }, [token, pageNumber, searchDate, searchTotal]);

    const formatDate = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    };

    return (
        <>
            <Navbar activePage="/profile" />

            <main className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-lg text-black mt-8">
                <h1 className="text-4xl font-extrabold uppercase mb-8 text-center">Historial de Pedidos</h1>

                {/* Filtros */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md px-4 py-2"
                        placeholder="Filtrar por fecha"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                    />

                    <input
                        type="number"
                        min={0}
                        step="any"
                        className="border border-gray-300 rounded-md px-4 py-2"
                        placeholder="Total mínimo"
                        value={searchTotal}
                        onChange={(e) => setSearchTotal(e.target.value)}
                    />
                </div>

                {loading ? (
                    <p className="text-center py-10 text-black">Cargando pedidos...</p>
                ) : orders.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-[60vh] text-black">
                        <h2 className="text-5xl font-bold mb-6">No hay pedidos que coincidan</h2>
                    </div>
                ) : (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Número de Pedido</th>
                                <th className="border border-gray-300 px-4 py-2">Fecha de Compra</th>
                                <th className="border border-gray-300 px-4 py-2">Total</th>
                                <th className="border border-gray-300 px-4 py-2">Estado</th>
                                <th className="border border-gray-300 px-4 py-2">Detalles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 text-center font-mono">
                                        {order.orderNumber}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {formatDate(order.purchaseDate)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                                        ${order.total.toFixed(2)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center capitalize">
                                        {order.orderStatus}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <Link href={`/orders/${order.id}`} className="text-indigo-600 hover:underline">
                                            Ver detalles
                                        </Link>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Paginación simple */}
                <div className="flex justify-center mt-6 gap-4">
                    <button
                        onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                        disabled={pageNumber === 1}
                        className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span className="flex items-center font-semibold">Página {pageNumber}</span>
                    <button
                        onClick={() => setPageNumber((p) => p + 1)}
                        disabled={orders.length < pageSize}
                        className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            </main>
        </>
    );
}
