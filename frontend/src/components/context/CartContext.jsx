

import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, size, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size
      );

      // Pick **first image** from product.images
      const firstImage = product.images && product.images.length > 0 
        ? product.images[0].image 
        : "/images/fallback.png";

      const cartItemData = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: firstImage, // <-- first image
        sizes: product.sizes || [],
        shortDescription: product.shortDescription || "",
        size,
        quantity,
      };

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, cartItemData];
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const updateQuantity = (id, size, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const updateSize = (id, oldSize, newSize) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id && item.size === newSize);

      if (existing) {
        return prev
          .map((item) =>
            item.id === id && item.size === oldSize
              ? { ...existing, quantity: existing.quantity + item.quantity }
              : item
          )
          .filter(
            (item, index, arr) =>
              arr.findIndex((i) => i.id === item.id && i.size === item.size) ===
              index
          );
      }

      return prev.map((item) =>
        item.id === id && item.size === oldSize ? { ...item, size: newSize } : item
      );
    });
  };

   const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, updateSize, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
