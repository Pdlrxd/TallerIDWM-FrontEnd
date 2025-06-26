import { Navbar } from "@/components/Navbar";
import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="max-w-4xl mx-auto mt-8 p-4 mb-8">
                <div className="bg-white shadow-md rounded-xl p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

