import { AuthGuardClient } from "@/components/AuthGuardClient";
import ViewProductsPage from "@/views/productsPage/ViewProductsPage";

export default function Home() {
  return (
    <AuthGuardClient>
      <ViewProductsPage />
    </AuthGuardClient>
  );
}
