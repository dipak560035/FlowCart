"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuery } from "@tanstack/react-query";
import { Plus, Minus } from "lucide-react";
import type { FAQ as FAQType } from "@/store";

gsap.registerPlugin(ScrollTrigger);

async function fetchFAQs(): Promise<FAQType[]> {
  const res = await fetch("/api/faqs");
  if (!res.ok) throw new Error("Failed to fetch FAQs");
  return res.json();
}

function FAQItem({ faq, index }: { faq: FAQType; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const content = contentRef.current;
    if (!content) return;

    if (!isOpen) {
      gsap.set(content, { height: "auto", opacity: 1 });
      const height = content.offsetHeight;
      gsap.from(content, { height: 0, opacity: 0, duration: 0.35, ease: "power2.out" });
      gsap.to(arrowRef.current, { rotation: 180, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(content, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(arrowRef.current, { rotation: 0, duration: 0.3, ease: "power2.in" });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item border border-[#1a1a1a] rounded-2xl overflow-hidden hover:border-[#2e2e2e] transition-colors">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <span className="font-display font-semibold text-white group-hover:text-[#e8ff47] transition-colors pr-4">
          {faq.question}
        </span>
        <div
          ref={arrowRef}
          className="flex-shrink-0 w-7 h-7 bg-[#1a1a1a] rounded-full flex items-center justify-center text-[#888]"
        >
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <p className="px-6 pb-6 text-[#888] leading-relaxed text-sm">{faq.answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { data: faqs, isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFAQs,
  });

  useEffect(() => {
    if (!faqs) return;
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [faqs]);

  return (
    <section ref={sectionRef} id="faq" className="py-24 border-t border-[#1a1a1a]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#e8ff47] text-xs font-bold tracking-[0.2em] uppercase mb-3">Got Questions?</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">FAQ</h2>
          <p className="text-[#888]">Everything you need to know about FlowCart.</p>
        </div>

        <div className="space-y-3">
          {isLoading &&
            [...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-16 rounded-2xl" />
            ))}

          {faqs?.map((faq, idx) => (
            <FAQItem key={faq.id} faq={faq} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}