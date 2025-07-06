"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

interface Props {
    children: ReactNode;
}

export default function CheckoutLayout({ children }: Props) {
    return (
        <>
            <Navbar activePage="/cart" />
            <main className="min-h-screen bg-gray-900 flex justify-center items-center px-4 py-10">
                <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative">
                    {children}
                </div>
            </main>
        </>
    );
}
