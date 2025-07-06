"use client";

import { AuthGuardAdmin } from "@/components/AuthGuardAdmin";
import ViewAdminProductList from "@/views/adminPage/listProductView/ViewAdminProductList";

export default function Page() {
    return (
        <AuthGuardAdmin>
            <ViewAdminProductList />
        </AuthGuardAdmin>
    );
}
