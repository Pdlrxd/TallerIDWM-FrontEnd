"use client";

import { ViewCartProductContent } from "@/views/cartPage/ViewCartProductContent";
import { AuthGuard } from "@/components/AuthGuard";

export default function CartPage() {
    return (
        <AuthGuard>
            <main className="min-h-screen bg-gray-50 py-10">
                <ViewCartProductContent />
            </main>
        </AuthGuard>
    );
}
