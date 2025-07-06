"use client";

import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/Navbar";

export default function SuccessPage() {
    return (
        <>
            <Navbar activePage="/cart" />

            <main className="flex flex-col justify-center items-center min-h-[80vh] px-6 text-center max-w-xl mx-auto">
                <h1 className="text-5xl font-extrabold mb-6">¡Gracias por tu compra!</h1>
                <p className="text-2xl mb-8">
                    Tu pedido se ha procesado correctamente.
                </p>
                <Button
                    onClick={() => (window.location.href = "/")}
                    className="px-8 py-4 bg-black text-white rounded-lg text-lg font-semibold"
                >
                    Volver al inicio
                </Button>
            </main>
        </>
    );
}
