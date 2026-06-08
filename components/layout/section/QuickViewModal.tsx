"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X, ShoppingCart, Heart, Star, Minus, Plus, Check } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeQuickView } from "@/store/slices/quickViewSlice";
import { addToCart, openCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function QuickViewModal() {
  const dispatch = useAppDispatch();
  const { isOpen, product } = useAppSelector((s) => s.quickView);
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const isWishlisted = product ? wishlistItems.some((i) => i.id === product.id) : false;

  useEffect(() => {
    if (!modalRef.current || !overlayRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(modalRef.current, { scale: 0.9, opacity: 0, y: 30 });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(modalRef.current, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" });
      setQty(1);
      setAdded(false);
    } else {
      document.body.style.overflow = "";
      gsap.to(modalRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.25, ease: "power2.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    }
  }, [isOpen]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ ...product, selectedColor: selectedColor ?? undefined, quantity: qty } as any));
    dispatch(openCart());
    setAdded(true);
    setTimeout(() => {
      dispatch(closeQuickView());
    }, 800);
  };

  if (!product) return (
    <div className={`fixed inset-0 z-[70] ${isOpen ? "" : "pointer-events-none"}`}>
      <div ref={overlayRef} className="absolute inset-0 bg-black/70 backdrop-blur-md opacity-0" />
      <div ref={modalRef} className="absolute inset-0 flex items-center justify-center p-4" />
    </div>
  );

  return (
    <div className={`fixed inset-0 z-[70] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => dispatch(closeQuickView())}
        className="absolute inset-0 bg-black/70 backdrop-blur-md opacity-0"
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative bg-[#111] border border-[#222] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl opacity-0"
        >
          {/* Close */}
          <button
            onClick={() => dispatch(closeQuickView())}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-[#1a1a1a] hover:bg-[#222] rounded-full flex items-center justify-center text-[#888] hover:text-white transition-colors"
          >
            <X size={16} />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#111] rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none p-12 flex items-center justify-center min-h-[250px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#e8ff47]/5 to-transparent" />
              <div className="text-[7rem] select-none">{product.image}</div>
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#555] text-xs tracking-wider uppercase">{product.category}</span>
                  {product.tag && (
                    <span className="bg-[#e8ff47] text-[#080808] text-[10px] font-bold px-2 py-0.5 rounded-full">{product.tag}</span>
                  )}
                </div>
                <h2 className="font-display text-2xl font-bold text-white leading-tight">{product.name}</h2>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-[#e8ff47]" fill={i < Math.floor(product.rating) ? "#e8ff47" : "none"} />
                  ))}
                </div>
                <span className="text-[#888] text-sm">{product.rating} · {product.reviews.toLocaleString()} reviews</span>
              </div>

              <p className="text-[#888] text-sm leading-relaxed">{product.longDescription}</p>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <p className="text-[#555] text-xs uppercase tracking-wider mb-2">Color</p>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "w-7 h-7 rounded-full border-2 transition-all",
                          selectedColor === color ? "border-[#e8ff47] scale-110" : "border-transparent hover:border-[#555]"
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-display font-bold text-3xl text-white">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-[#555] line-through">{formatPrice(product.originalPrice)}</span>
                )}
                {product.originalPrice && (
                  <span className="text-[#e8ff47] text-sm font-medium">
                    Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Qty */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl px-4 py-3 border border-[#222]">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="text-[#888] hover:text-white transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="text-white font-display font-bold w-6 text-center">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="text-[#888] hover:text-white transition-colors">
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => dispatch(toggleWishlist(product))}
                  className={cn(
                    "p-3 rounded-xl border transition-all duration-200",
                    isWishlisted
                      ? "bg-[#e8ff47]/10 border-[#e8ff47]/30 text-[#e8ff47]"
                      : "border-[#222] text-[#555] hover:text-white hover:border-[#333]"
                  )}
                >
                  <Heart size={18} fill={isWishlisted ? "#e8ff47" : "none"} />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={cn(
                  "w-full py-4 rounded-xl font-display font-bold text-base flex items-center justify-center gap-2 transition-all duration-300",
                  !product.inStock
                    ? "bg-[#1a1a1a] text-[#555] cursor-not-allowed"
                    : added
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-[#e8ff47] text-[#080808] hover:bg-[#c8df2a] shadow-[0_0_30px_rgba(232,255,71,0.2)]"
                )}
              >
                {added ? (
                  <><Check size={18} /> Added to Cart</>
                ) : !product.inStock ? (
                  "Out of Stock"
                ) : (
                  <><ShoppingCart size={18} /> Add to Cart · {formatPrice(product.price * qty)}</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}