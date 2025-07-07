"use client";

import { CreateProductView } from "@/views/adminPage/createProductView/CreateProductView";
import { AuthGuardAdmin } from "@/components/AuthGuardAdmin";

export default function CreateProductPage() {
    return (
        <AuthGuardAdmin>
            <CreateProductView />
        </AuthGuardAdmin>
    );
}
