import {AuthGuardAdmin} from "@/components/AuthGuardAdmin";
import { ViewAdminPage } from "@/views/adminPage/ViewAdminPage";

export default function AdminPage() {
  return (
    <AuthGuardAdmin>
      <ViewAdminPage />
    </AuthGuardAdmin>
  );
}
