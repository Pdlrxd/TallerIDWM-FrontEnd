"use client";

import { AuthGuardAdmin } from "@/components/AuthGuardAdmin";
import ViewAdminUserList from "@/views/adminPage/listUserView/ViewAdminUserList";

export default function Page() {
    return (
        <AuthGuardAdmin>
            <ViewAdminUserList />
        </AuthGuardAdmin>
    );
}
