"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATEGORIES } from "@/lib/data";
import { useAppDispatch } from "@/store/hooks";
import { setActiveCategory } from "@/store/slices/uiSlice";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Categories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cat-card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cat-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="categories" className="py-24 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#e8ff47] text-xs font-bold tracking-[0.2em] uppercase mb-3">Shop By</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">Categories</h2>
          </div>
          <a href="#products" className="hidden md:flex items-center gap-2 text-[#888] hover:text-white transition-colors text-sm font-medium">
            View all <ArrowRight size={16} />
          </a>
        </div>

        <div className="cat-grid grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                dispatch(setActiveCategory(cat.name));
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`cat-card group relative p-6 rounded-2xl border border-[#222] bg-gradient-to-br ${cat.gradient} hover:border-[#e8ff47]/30 transition-all duration-300 text-left overflow-hidden`}
            >
              <div className="absolute inset-0 bg-[#e8ff47]/0 group-hover:bg-[#e8ff47]/3 transition-colors duration-300" />
              <div className="text-4xl mb-4">{cat.icon}</div>
              <div className="font-display font-bold text-white text-lg">{cat.name}</div>
              <div className="text-[#555] text-sm mt-1">{cat.count} products</div>
              <div className="mt-4 flex items-center gap-1 text-[#e8ff47] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Browse <ArrowRight size={12} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}