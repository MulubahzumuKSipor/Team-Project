'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRaw } from './data'; // Your product type

// Extend UserRaw to include quantity for cart items
type CartItem = UserRaw & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: UserRaw) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  notification: string | null;
  clearNotification: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);



  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000)
  }

  const clearNotification = () => {
    setNotification(null);
  }
  const addToCart = (product: UserRaw) => {
    setCart(prev => {
      const existing = prev.find(item => item.user_id === product.user_id);
      if (existing) {
        const message = `Added to cart!`
        showNotification(message);
        // Increase quantity if already in cart
        return prev.map(item =>
          item.user_id === product.user_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.user_id !== parseInt(productId)));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.user_id === parseInt(productId) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.featuredproduct?.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, notification, clearNotification }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart context anywhere
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
