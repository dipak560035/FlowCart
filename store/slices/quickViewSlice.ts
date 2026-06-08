import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/store";

interface QuickViewState {
  isOpen: boolean;
  product: Product | null;
}

const initialState: QuickViewState = { isOpen: false, product: null };

const quickViewSlice = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    openQuickView: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
      state.isOpen = true;
    },
    closeQuickView: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openQuickView, closeQuickView } = quickViewSlice.actions;
export default quickViewSlice.reducer;
