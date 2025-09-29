import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartItems: [],
  addToCart: (product) =>
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === product.id
      );
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...state.cartItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: (updatedItems[existingItemIndex].quantity || 1) + 1,
        };
        return { cartItems: updatedItems };
      }
      return {
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => String(item.id) !== String(id)
      ),
    })),
  clearCart: () => set({ cartItems: [] }),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),
}));
