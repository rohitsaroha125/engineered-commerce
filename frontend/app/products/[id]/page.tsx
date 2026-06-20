import { notFound } from "next/navigation";
import ProductDetail from "@/app/_components/ProductDetail";

interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  imageUrl?: string | null;
  description?: string;
}

async function getProduct(id: string): Promise<Product | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://backend:8010";
  try {
    const res = await fetch(`${API_URL}products/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    console.log("datais", data);
    return data.product ?? data;
  } catch {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
