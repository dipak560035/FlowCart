import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  const products = category && category !== "All"
    ? PRODUCTS.filter((p) => p.category === category)
    : PRODUCTS;

  return NextResponse.json(products);
}