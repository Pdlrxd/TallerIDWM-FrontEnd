import { Navbar } from "@/components/Navbar";
import { ViewCartProductContent } from "@/views/cartPage/ViewCartProductContent";

export default function CartPage() {
    return (
        <>
            <Navbar activePage="/cart" />
            <div className="min-h-screen bg-gray-900 p-6">
                <main className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <ViewCartProductContent />
                </main>
            </div>
        </>
    );
}
