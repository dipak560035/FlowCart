"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X, Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeWishlist, toggleWishlist } from "@/store/slices/wishlistSlice";
import { addToCart, openCart } from "@/store/slices/cartSlice";
import { formatPrice } from "@/lib/utils";

export default function WishlistDrawer() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((s) => s.wishlist);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    if (isOpen) {
      gsap.set(drawerRef.current, { x: "100%" });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(drawerRef.current, { x: "0%", duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(drawerRef.current, { x: "100%", duration: 0.3, ease: "power3.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    }
  }, [isOpen]);

  const handleMoveToCart = (item: any) => {
    dispatch(addToCart(item));
    dispatch(toggleWishlist(item));
    dispatch(closeWishlist());
    dispatch(openCart());
  };

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => dispatch(closeWishlist())}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute top-0 right-0 h-full w-full max-w-md bg-[#111] border-l border-[#222] flex flex-col translate-x-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#222]">
          <div>
            <h2 className="font-display text-xl font-bold text-white">Your Wishlist</h2>
            <p className="text-sm text-[#888] mt-0.5">{items.length} item{items.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => dispatch(closeWishlist())}
            className="p-2 text-[#888] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center">
                <Heart size={24} className="text-[#555]" />
              </div>
              <div>
                <p className="font-display font-semibold text-white">Wishlist is empty</p>
                <p className="text-sm text-[#888] mt-1">Add items to your wishlist while browsing</p>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-[#1a1a1a] rounded-2xl border border-[#222]/50 hover:border-[#333] transition-colors duration-300">
                <div className="w-16 h-16 bg-[#222] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {item.image}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-display font-semibold text-white text-sm truncate">{item.name}</p>
                      <button
                        onClick={() => dispatch(toggleWishlist(item))}
                        className="text-[#555] hover:text-[#ff4444] transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-[#888] text-xs mt-0.5">{item.category}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-display font-bold text-white">{formatPrice(item.price)}</span>
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="flex items-center gap-1.5 bg-[#e8ff47]/10 text-[#e8ff47] hover:bg-[#e8ff47] hover:text-[#080808] transition-colors text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#e8ff47]/20"
                    >
                      <ShoppingCart size={12} />
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
