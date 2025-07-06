"use client";

import { ViewCartProductContent } from "@/views/cartPage/ViewCartProductContent";
import { AuthGuardAdmin } from "@/components/AuthGuardAdmin";

export default function CartPage() {
    return (
        <AuthGuardAdmin>
            <main className="min-h-screen bg-gray-50 py-10">
                <ViewCartProductContent />
            </main>
        </AuthGuardAdmin>
    );
}
