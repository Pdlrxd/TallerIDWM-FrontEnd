"use client";

import { ViewCartProductContent } from "@/views/cartPage/ViewCartProductContent";
import { AuthGuardClient } from "@/components/AuthGuardClient";

export default function CartPage() {
    return (
        <AuthGuardClient>
            <main className="min-h-screen bg-gray-50 py-10">
                <ViewCartProductContent />
            </main>
        </AuthGuardClient>
    );
}
