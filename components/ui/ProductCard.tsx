"use client";

import { useState } from "react";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, openCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { openQuickView } from "@/store/slices/quickViewSlice";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  const isWishlisted = wishlistItems.some((i) => i.id === product.id);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    dispatch(openCart());
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };




  return (
    <div
      className={cn(
        "product-card group relative bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden cursor-pointer transition-all duration-400 hover:border-[#2e2e2e] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:-translate-y-1",
        className
      )}
      onClick={() => dispatch(openQuickView(product))}
    >
      {/* Tag */}
      {product.tag && (
        <div className="absolute top-3 left-3 z-10 bg-[#e8ff47] text-[#080808] text-[10px] font-bold tracking-[0.1em] px-2.5 py-1 rounded-full">
          {product.tag}
        </div>
      )}

      {/* Out of stock */}
      {!product.inStock && (
        <div className="absolute top-3 left-3 z-10 bg-[#333] text-[#888] text-[10px] font-bold tracking-[0.1em] px-2.5 py-1 rounded-full">
          SOLD OUT
        </div>
      )}

      {/* Wishlist */}
      <button
        onClick={handleWishlist}
        className={cn(
          "absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
          isWishlisted
            ? "bg-[#e8ff47] text-[#080808]"
            : "bg-[#1a1a1a] text-[#555] opacity-0 group-hover:opacity-100 hover:text-[#e8ff47]"
        )}
      >
        <Heart size={14} fill={isWishlisted ? "#080808" : "none"} />
      </button>

      {/* Image */}
      <div className="aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#111] flex items-center justify-center relative overflow-hidden">
        <div className="text-[5rem] group-hover:scale-110 transition-transform duration-500 select-none">
          {product.image}
        </div>
        
        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
          <button
            onClick={handleQuickView}
            className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Eye size={13} />
            Quick View
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[#555] text-xs mb-1 tracking-wide">{product.category}</p>
        <h3 className="font-display font-bold text-white text-base mb-1 leading-tight">{product.name}</h3>
        <p className="text-[#888] text-sm leading-relaxed mb-3 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={i < Math.floor(product.rating) ? "text-[#e8ff47]" : "text-[#333]"}
                fill={i < Math.floor(product.rating) ? "#e8ff47" : "none"}
              />
            ))}
          </div>
          <span className="text-[#555] text-xs">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price + Add to cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display font-bold text-xl text-white">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[#555] text-sm line-through ml-2">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}















































// "use client";

// import { useState } from "react";
// import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
// import { Product } from "@/store";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { addToCart, openCart } from "@/store/slices/cartSlice";
// import { toggleWishlist } from "@/store/slices/wishlistSlice";
// import { openQuickView } from "@/store/slices/quickViewSlice";
// import { formatPrice } from "@/lib/utils";
// import { cn } from "@/lib/utils";

// interface ProductCardProps {
//   product: Product;
//   className?: string;
// }

// export default function ProductCard({ product, className }: ProductCardProps) {
//   const dispatch = useAppDispatch();
//   const wishlistItems = useAppSelector((s) => s.wishlist.items);
//   const isWishlisted = wishlistItems.some((i) => i.id === product.id);
//   const [addedAnimation, setAddedAnimation] = useState(false);

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     dispatch(addToCart(product));
//     dispatch(openCart());
//     setAddedAnimation(true);
//     setTimeout(() => setAddedAnimation(false), 1500);
//   };

//   const handleWishlist = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     dispatch(toggleWishlist(product));
//   };

//   const handleQuickView = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     dispatch(openQuickView(product));
//   };

//   return (
//     <div
//       className={cn(
//         "product-card group relative bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden cursor-pointer transition-all duration-400 hover:border-[#2e2e2e] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:-translate-y-1",
//         className
//       )}
//       onClick={() => dispatch(openQuickView(product))}
//     >
//       {/* Tag */}
//       {product.tag && (
//         <div className="absolute top-3 left-3 z-10 bg-[#e8ff47] text-[#080808] text-[10px] font-bold tracking-[0.1em] px-2.5 py-1 rounded-full">
//           {product.tag}
//         </div>
//       )}

//       {/* Out of stock */}
//       {!product.inStock && (
//         <div className="absolute top-3 left-3 z-10 bg-[#333] text-[#888] text-[10px] font-bold tracking-[0.1em] px-2.5 py-1 rounded-full">
//           SOLD OUT
//         </div>
//       )}

//       {/* Wishlist */}
//       <button
//         onClick={handleWishlist}
//         className={cn(
//           "absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
//           isWishlisted
//             ? "bg-[#e8ff47] text-[#080808]"
//             : "bg-[#1a1a1a] text-[#555] opacity-0 group-hover:opacity-100 hover:text-[#e8ff47]"
//         )}
//       >
//         <Heart size={14} fill={isWishlisted ? "#080808" : "none"} />
//       </button>

//       {/* Image */}
//       <div className="aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#111] flex items-center justify-center relative overflow-hidden">
//         <div className="text-[5rem] group-hover:scale-110 transition-transform duration-500 select-none">
//           {product.image}
//         </div>
        
//         {/* Hover overlay with actions */}
//         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
//           <button
//             onClick={handleQuickView}
//             className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
//           >
//             <Eye size={13} />
//             Quick View
//           </button>
//         </div>
//       </div>

//       {/* Info */}
//       <div className="p-4">
//         <p className="text-[#555] text-xs mb-1 tracking-wide">{product.category}</p>
//         <h3 className="font-display font-bold text-white text-base mb-1 leading-tight">{product.name}</h3>
//         <p className="text-[#888] text-sm leading-relaxed mb-3 line-clamp-2">{product.description}</p>

//         {/* Rating */}
//         <div className="flex items-center gap-1.5 mb-4">
//           <div className="flex items-center gap-0.5">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 size={10}
//                 className={i < Math.floor(product.rating) ? "text-[#e8ff47]" : "text-[#333]"}
//                 fill={i < Math.floor(product.rating) ? "#e8ff47" : "none"}
//               />
//             ))}
//           </div>
//           <span className="text-[#555] text-xs">({product.reviews.toLocaleString()})</span>
//         </div>

//         {/* Price + Add to cart */}
//         <div className="flex items-center justify-between">
//           <div>
//             <span className="font-display font-bold text-xl text-white">{formatPrice(product.price)}</span>
//             {product.originalPrice && (
//               <span className="text-[#555] text-sm line-through ml-2">{formatPrice(product.originalPrice)}</span>
//             )}
//           </div>

//           <button
//             onClick={handleAddToCart}
//             disabled={!product.inStock}
//             className={cn(
//               "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200",
//               !product.inStock
//                 ? "bg-[#1a1a1a] text-[#333] cursor-not-allowed"
//                 : addedAnimation
//                 ? "bg-[#e8ff47] text-[#080808] scale-90"
//                 : "bg-[#e8ff47]/10 text-[#e8ff47] hover:bg-[#e8ff47] hover:text-[#080808]"
//             )}
//           >
//             <ShoppingCart size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
