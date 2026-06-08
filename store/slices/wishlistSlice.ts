import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/store";

interface WishlistState {
  items: Product[];
  isOpen: boolean;
}

const initialState: WishlistState = { items: [], isOpen: false };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx >= 0) {
        state.items.splice(idx, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    openWishlist: (state) => {
      state.isOpen = true;
    },
    closeWishlist: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleWishlist, openWishlist, closeWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
