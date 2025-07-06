"use client";

import { useCheckout } from "@/hooks/useCheckOut";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function CheckoutPage() {
    const {
        address,
        setAddress,
        paymentMethod,
        setPaymentMethod,
        loading,
        confirmAddress,
        confirmPayment,
        confirmOrder,
    } = useCheckout();

    const [step, setStep] = useState(1);

    const nextStep = async (confirmFn: () => Promise<string | boolean>) => {
        const result = await confirmFn();
        if (result === true) {
            setStep((s) => s + 1);
        } else {
            if (typeof result === "string") {
                alert(result);
            }
        }
    };

    const prevStep = () => setStep((s) => (s > 1 ? s - 1 : s));

    return (
        <div className="min-h-screen flex justify-center items-start px-4 py-10 bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
                    Proceso de Compra
                </h1>

                {step === 1 && (
                    <>
                        <h2 className="text-xl font-semibold mb-6 text-gray-900 text-center">
                            Dirección de Envío
                        </h2>
                        <div className="space-y-4 mb-6">
                            <input
                                type="text"
                                placeholder="Calle"
                                value={address.Street}
                                onChange={(e) =>
                                    setAddress({ ...address, Street: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="text"
                                placeholder="Número"
                                value={address.Number}
                                onChange={(e) =>
                                    setAddress({ ...address, Number: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="text"
                                placeholder="Comuna"
                                value={address.Commune}
                                onChange={(e) =>
                                    setAddress({ ...address, Commune: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="text"
                                placeholder="Región"
                                value={address.Region}
                                onChange={(e) =>
                                    setAddress({ ...address, Region: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="text"
                                placeholder="Código Postal"
                                value={address.PostalCode}
                                onChange={(e) =>
                                    setAddress({ ...address, PostalCode: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button
                                onClick={() => nextStep(confirmAddress)}
                                disabled={loading}
                                className="px-6 py-3"
                            >
                                Confirmar Dirección
                            </Button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="text-xl font-semibold mb-6 text-gray-900 text-center">
                            Método de Pago
                        </h2>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Selecciona un método</option>
                            <option value="CreditCard">Tarjeta de Crédito</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Transferencia">Transferencia</option>
                        </select>


                        <div className="flex justify-between gap-3">
                            <Button onClick={prevStep} className="px-6 py-3" variant="outline">
                                Volver
                            </Button>
                            <Button
                                onClick={() => nextStep(confirmPayment)}
                                disabled={loading || !paymentMethod}
                                className="px-6 py-3"
                            >
                                Confirmar Pago
                            </Button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2 className="text-xl font-semibold mb-6 text-gray-900 text-center">
                            Resumen del Pedido
                        </h2>
                        <div className="mb-6 space-y-3">
                            <p>
                                <strong>Dirección:</strong> {address.Street} {address.Number},{" "}
                                {address.Commune}, {address.Region}
                            </p>
                            <p>
                                <strong>Código Postal:</strong> {address.PostalCode}
                            </p>
                            <p>
                                <strong>Método de Pago:</strong> {paymentMethod}
                            </p>
                        </div>

                        <div className="flex justify-between gap-3">
                            <Button onClick={prevStep} className="px-6 py-3" variant="outline">
                                Volver
                            </Button>
                            <Button onClick={confirmOrder} disabled={loading} className="px-6 py-3">
                                Confirmar Pedido
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
