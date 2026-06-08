"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeCart, removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((s) => s.cart);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => dispatch(closeCart())}
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
            <h2 className="font-display text-xl font-bold text-white">Your Cart</h2>
            <p className="text-sm text-[#888] mt-0.5">{items.length} item{items.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => dispatch(closeCart())}
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
                <ShoppingBag size={24} className="text-[#555]" />
              </div>
              <div>
                <p className="font-display font-semibold text-white">Cart is empty</p>
                <p className="text-sm text-[#888] mt-1">Add some products to get started</p>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.selectedColor}`} className="flex gap-4 p-4 bg-[#1a1a1a] rounded-2xl">
                <div className="w-16 h-16 bg-[#222] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {item.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-white text-sm truncate">{item.name}</p>
                  <p className="text-[#888] text-xs mt-0.5">{item.category}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-[#222] rounded-lg p-1">
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        className="w-6 h-6 flex items-center justify-center text-[#888] hover:text-white transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-white text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="w-6 h-6 flex items-center justify-center text-[#888] hover:text-white transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-display font-bold text-[#e8ff47]">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-[#555] hover:text-[#ff4444] transition-colors self-start mt-1"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#222] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#888]">Subtotal</span>
              <span className="font-display font-bold text-xl text-white">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-[#555]">Shipping and taxes calculated at checkout</p>
            <button className="w-full bg-[#e8ff47] text-[#080808] font-display font-bold py-4 rounded-xl hover:bg-[#c8df2a] transition-colors flex items-center justify-center gap-2 group">
              Checkout
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}