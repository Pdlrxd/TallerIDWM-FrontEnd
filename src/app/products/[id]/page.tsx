import { ProductPage } from "@/views/productsPage/[ID]/ViewProductUnit";

export default function ProductUnitPage({ params }: { params: { id: string } }) {

  console.log("Product Unit Page Cargada");

  return <ProductPage params={params} />

}