"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ShoppingCart, Heart, Search, Menu, X, Zap } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCart } from "@/store/slices/cartSlice";
import { toggleMobileMenu, closeMobileMenu } from "@/store/slices/uiSlice";
import { openWishlist } from "@/store/slices/wishlistSlice";
import Link from "next/link";

const NAV_LINKS = ["Products", "Categories", "About", "Blog"];

export default function Navbar() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  const mobileMenuOpen = useAppSelector((s) => s.ui.mobileMenuOpen);
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2,
      });
    }, navRef);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080808]/90 backdrop-blur-xl border-b border-[#1a1a1a]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="nav-item flex items-center gap-2 group">
            <div className="w-7 h-7 bg-[#e8ff47] rounded flex items-center justify-center">
              <Zap size={14} className="text-[#080808]" fill="#080808" />
            </div>
            <span className="font-display font-800 text-lg tracking-tight text-white">
              Flow<span className="text-[#e8ff47]">Cart</span>
            </span>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="nav-item text-sm text-[#888] hover:text-white transition-colors duration-200 font-medium tracking-wide"
              >
                {link}
              </a>
            ))}
            <Link
              href="/dashboard"
              className="nav-item text-sm text-[#888] hover:text-[#e8ff47] transition-colors duration-200 font-medium tracking-wide"
            >
              Dashboard
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <button className="nav-item p-2 text-[#888] hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <Search size={18} />
            </button>
            <button
              onClick={() => dispatch(openWishlist())}
              className="nav-item relative p-2 text-[#888] hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <Heart size={18} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#e8ff47] text-[#080808] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => dispatch(toggleCart())}
              className="nav-item relative p-2 text-[#888] hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#e8ff47] text-[#080808] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="nav-item md:hidden p-2 text-[#888] hover:text-white transition-colors rounded-lg hover:bg-white/5 ml-1"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => dispatch(closeMobileMenu())}
        />
        <div
          className={`absolute top-16 left-0 right-0 bg-[#111] border-b border-[#222] p-6 transition-transform duration-300 ${
            mobileMenuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => dispatch(closeMobileMenu())}
                className="text-lg font-display font-semibold text-[#f5f5f0] hover:text-[#e8ff47] transition-colors py-1"
              >
                {link}
              </a>
            ))}
            <Link
              href="/dashboard"
              onClick={() => dispatch(closeMobileMenu())}
              className="text-lg font-display font-semibold text-[#e8ff47] py-1"
            >
              Dashboard ↗
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}