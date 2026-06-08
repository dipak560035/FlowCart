import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import uiReducer from "./slices/uiSlice";
import quickViewReducer from "./slices/quickViewSlice";
import wishlistReducer from "./slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
    quickView: quickViewReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Common types used across the application
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  tag?: string;
  description: string;
  longDescription: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  colors: string[];
}

export interface CartItem extends Product {
  selectedColor?: string;
  quantity: number;
}

export interface Category {
  id: number;
  name: string;
  count: number;
  icon: string;
  gradient: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}