"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/store";
import ProductCard from "@/components/ui/ProductCard";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveCategory } from "@/store/slices/uiSlice";
import { SlidersHorizontal } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Audio", "Computing", "Workspace", "Wearables"];

async function fetchProducts(category: string): Promise<Product[]> {
  const url = category === "All" ? "/api/products" : `/api/products?category=${category}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((s) => s.ui.activeCategory);

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products", activeCategory],
    queryFn: () => fetchProducts(activeCategory),
    staleTime: 30_000,
  });

  useEffect(() => {
    if (!products || isLoading) return;

    const ctx = gsap.context(() => {
      gsap.from(".product-card", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".products-grid",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [products, isLoading]);

  return (
    <section ref={sectionRef} id="products" className="py-24 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[#e8ff47] text-xs font-bold tracking-[0.2em] uppercase mb-3">Curated For You</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">Featured Products</h2>
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-[#555]" />
            <span className="text-[#555] text-sm mr-2">Filter:</span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => dispatch(setActiveCategory(cat))}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-[#e8ff47] text-[#080808]"
                      : "bg-[#1a1a1a] text-[#888] hover:text-white border border-[#222] hover:border-[#333]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading &&
            [...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}

          {isError && (
            <div className="col-span-3 text-center py-16">
              <p className="text-[#888]">Failed to load products. Please try again.</p>
            </div>
          )}

          {!isLoading &&
            !isError &&
            products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

          {!isLoading && !isError && products?.length === 0 && (
            <div className="col-span-3 text-center py-16">
              <p className="text-[#888]">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}