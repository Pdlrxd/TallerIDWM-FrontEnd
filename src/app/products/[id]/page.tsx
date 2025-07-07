import ProductPage from "@/views/productsPage/[ID]/ViewProductUnit";
import { AuthGuardClient } from "@/components/AuthGuardClient";

export default function ProductUnitPage({ params }: { params: { id: string } }) {
  return (
    <AuthGuardClient>
      <ProductPage params={params} />
    </AuthGuardClient>
  );
}
