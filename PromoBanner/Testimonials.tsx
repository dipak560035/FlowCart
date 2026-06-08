"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#e8ff47] text-xs font-bold tracking-[0.2em] uppercase mb-3">Social Proof</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">What People Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="testimonial-card bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 hover:border-[#2e2e2e] transition-colors duration-300 relative"
            >
              <Quote size={24} className="text-[#e8ff47]/30 mb-4" />
              <p className="text-[#aaa] leading-relaxed mb-6 text-sm">"{t.content}"</p>
              <div className="flex items-center gap-3 border-t border-[#1a1a1a] pt-5">
                <div className="w-10 h-10 bg-[#e8ff47]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#e8ff47] font-display font-bold text-xs">{t.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="font-display font-bold text-white text-sm">{t.name}</p>
                  <p className="text-[#555] text-xs">{t.role}</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={10} fill="#e8ff47" className="text-[#e8ff47]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logos/trust bar */}
        <div className="mt-16 flex items-center justify-center gap-12 flex-wrap">
          <p className="text-[#333] text-xs uppercase tracking-widest w-full text-center mb-4">Trusted by teams at</p>
          {["Linear", "Vercel", "Figma", "Notion", "Arc"].map((name) => (
            <span key={name} className="font-display font-bold text-[#333] hover:text-[#555] transition-colors text-lg">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}