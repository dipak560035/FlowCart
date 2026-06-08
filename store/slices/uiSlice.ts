import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  mobileMenuOpen: boolean;
  activeCategory: string;
}

const initialState: UIState = {
  mobileMenuOpen: false,
  activeCategory: "All",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { toggleMobileMenu, closeMobileMenu, setActiveCategory } = uiSlice.actions;
export default uiSlice.reducer;
