"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Timer } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PromoBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".promo-content > *", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 80%",
        },
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={bannerRef} className="py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-[#e8ff47] p-10 lg:p-16">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, rgba(0,0,0,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,0,0,0.2) 0%, transparent 50%)",
            }}
          />
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#080808]/5 hidden lg:block" 
            style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }} 
          />

          <div className="promo-content relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Timer size={16} className="text-[#080808]/60" />
                <span className="text-[#080808]/60 text-sm font-medium uppercase tracking-widest">Limited Time Offer</span>
              </div>
              <h2 className="font-display text-4xl lg:text-6xl font-800 text-[#080808] leading-none tracking-tight mb-4">
                Summer Sale.<br />
                Up to <span className="relative">
                  40% Off
                  <span className="absolute bottom-1 left-0 right-0 h-1 bg-[#080808]/20 rounded" />
                </span>
              </h2>
              <p className="text-[#080808]/70 text-lg max-w-md">
                Upgrade your workspace, audio, and carry. Our biggest sale of the season ends soon.
              </p>
            </div>

            <div className="flex flex-col gap-4 min-w-fit">
              {/* Countdown blocks */}
              <div className="flex items-center gap-3 mb-2">
                {[
                  { val: "02", label: "Days" },
                  { val: "14", label: "Hours" },
                  { val: "36", label: "Mins" },
                  { val: "08", label: "Secs" },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="bg-[#080808]/10 backdrop-blur-sm rounded-xl w-14 h-14 flex items-center justify-center">
                      <span className="font-display font-bold text-2xl text-[#080808]">{item.val}</span>
                    </div>
                    <span className="text-[#080808]/50 text-xs mt-1 block">{item.label}</span>
                  </div>
                ))}
              </div>

              <button className="bg-[#080808] text-[#e8ff47] font-display font-bold px-8 py-4 rounded-xl hover:bg-[#111] transition-colors flex items-center gap-2 group">
                Shop the Sale
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[#080808]/50 text-xs text-center">
                No code needed. Discount applied at checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}