"use client";

import { Navbar } from "@/components/Navbar";
import { CreateProductView } from "@/views/adminPage/createProductView/CreateProductView";
import { AuthGuardAdmin } from "@/components/AuthGuardAdmin";

export default function CreateProductPage() {
    return (
        <AuthGuardAdmin>
            <Navbar />
            <CreateProductView />
        </AuthGuardAdmin>
    );
}
