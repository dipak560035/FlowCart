import { NextResponse } from "next/server";
import { FAQS } from "@/lib/data";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return NextResponse.json(FAQS);
}