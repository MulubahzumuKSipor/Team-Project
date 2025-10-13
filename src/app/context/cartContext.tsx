
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of a cart item
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Define the shape of the context's value
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: number, newQuantity: number) => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // --- ADD TO CART LOGIC ---
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      // Check if the item already exists in the cart
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // If it exists, map over the items and update the quantity of the matching item
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If it's a new item, add it to the cart with a quantity of 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // --- UPDATE/REMOVE LOGIC --- (Your existing function, now managed here)
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Remove item if quantity is zero or less
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(
        cartItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};