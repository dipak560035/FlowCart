


"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-24 border-t border-[#1a1a1a]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-[#e8ff47] text-xs font-bold tracking-[0.2em] uppercase mb-4">Stay in the Loop</p>
        <h2 className="font-display text-4xl font-bold text-white mb-4">
          Get Early Access to<br />New Drops
        </h2>
        <p className="text-[#888] mb-10">
          Join 40,000+ subscribers. No spam, only launches and rare deals.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-[#e8ff47]/10 rounded-full flex items-center justify-center">
              <Check size={24} className="text-[#e8ff47]" />
            </div>
            <p className="font-display font-bold text-white text-xl">You're in!</p>
            <p className="text-[#888] text-sm">Welcome to the inner circle. Watch your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-[#111] border border-[#222] rounded-xl px-5 py-4 text-white placeholder-[#444] focus:outline-none focus:border-[#e8ff47]/50 transition-colors text-sm"
              required
            />
            <button
              type="submit"
              className="bg-[#e8ff47] text-[#080808] font-display font-bold px-6 py-4 rounded-xl hover:bg-[#c8df2a] transition-colors flex items-center gap-2 group whitespace-nowrap"
            >
              Subscribe
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        )}

        <p className="text-[#333] text-xs mt-6">
          By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
