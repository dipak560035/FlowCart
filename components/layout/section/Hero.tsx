"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Play, Star } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Stagger entrance animation
      tl.from(".hero-tag", { y: 20, opacity: 0, duration: 0.5 })
        .from(".hero-headline", { y: 60, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.2")
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.2")
        .from(".hero-stats", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.2")
        .from(".hero-image", { scale: 0.85, opacity: 0, duration: 1, ease: "expo.out" }, "-=0.8")
        .from(".hero-badge", { scale: 0, opacity: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.3");

      // Floating animation for product image
      gsap.to(".hero-image", {
        y: -16,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });

      // Badge subtle float
      gsap.to(".hero-badge", {
        y: -8,
        rotation: 3,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#e8ff47]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#4747ff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            <div className="hero-tag inline-flex items-center gap-2 bg-[#e8ff47]/10 border border-[#e8ff47]/20 text-[#e8ff47] text-xs font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#e8ff47] rounded-full animate-pulse" />
              New Collection — Summer 2025
            </div>

            <div className="space-y-2">
              <h1 className="hero-headline font-display text-6xl lg:text-7xl xl:text-8xl font-800 leading-[0.95] tracking-[-0.03em] text-white">
                Premium
              </h1>
              <h1 className="hero-headline font-display text-6xl lg:text-7xl xl:text-8xl font-800 leading-[0.95] tracking-[-0.03em]">
                <span className="text-[#e8ff47]">Tech</span>{" "}
                <span className="text-white">Gear</span>
              </h1>
              <h1 className="hero-headline font-display text-6xl lg:text-7xl xl:text-8xl font-800 leading-[0.95] tracking-[-0.03em] text-white">
                Redefined.
              </h1>
            </div>

            <p className="hero-sub text-lg text-[#888] max-w-md leading-relaxed">
              Curated hardware for people who care about the details. From workspace essentials to everyday carry — built to last, designed to impress.
            </p>

            <div className="hero-cta flex flex-wrap gap-4">
              <a
                href="#products"
                className="inline-flex items-center gap-2 bg-[#e8ff47] text-[#080808] font-display font-bold px-7 py-4 rounded-xl hover:bg-[#c8df2a] transition-all duration-200 group shadow-[0_0_40px_rgba(232,255,71,0.2)]"
              >
                Shop Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="inline-flex items-center gap-2 border border-[#2e2e2e] text-white font-medium px-7 py-4 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all duration-200">
                <Play size={16} fill="white" />
                Watch Film
              </button>
            </div>

            {/* Stats */}
            <div className="hero-stats flex items-center gap-8 pt-2">
              {[
                { value: "50K+", label: "Happy Customers" },
                { value: "4.9★", label: "Average Rating" },
                { value: "200+", label: "Premium Products" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-bold text-2xl text-white">{stat.value}</div>
                  <div className="text-xs text-[#555] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Visual */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Main product card */}
            <div className="hero-image relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-[#1a1a1a] to-[#111] rounded-3xl border border-[#2e2e2e] flex items-center justify-center shadow-2xl relative overflow-hidden">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e8ff47]/5 to-transparent" />
                <div className="text-[8rem] select-none">🎧</div>
              </div>

              {/* Floating price badge */}
              <div className="hero-badge absolute -top-4 -right-4 bg-[#e8ff47] text-[#080808] px-4 py-2 rounded-2xl font-display font-bold shadow-lg">
                <div className="text-xs font-medium opacity-60 line-through">$199</div>
                <div className="text-lg">$149</div>
              </div>

              {/* Review badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#111] border border-[#222] px-4 py-3 rounded-2xl shadow-lg">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} fill="#e8ff47" className="text-[#e8ff47]" />
                  ))}
                </div>
                <div className="text-white text-sm font-display font-bold">2,847 reviews</div>
                <div className="text-[#888] text-xs">Aether Wireless Buds</div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-2 h-2 bg-[#e8ff47] rounded-full animate-pulse" />
            <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-[#4747ff] rounded-full animate-pulse delay-500" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#555]">
        <span className="text-xs tracking-[0.2em] uppercase font-medium">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#555] to-transparent" />
      </div>
    </section>
  );
}