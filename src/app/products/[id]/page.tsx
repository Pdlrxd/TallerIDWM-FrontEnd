import ProductPage from "@/views/productsPage/[ID]/ViewProductUnit";

export default function ProductUnitPage({ params }: { params: { id: string } }) {
  return <ProductPage params={params} />;
}
