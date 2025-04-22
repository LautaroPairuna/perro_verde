// src/context/CartContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

export interface CartItem {
  id: string;
  quantity: number;
  // Otros campos, por ejemplo:
  thumbnail: string;
  name: string;
  price: number;
}

interface CartContextProps {
  cart: CartItem[];
  updateCart: (newCart: CartItem[]) => void;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const refreshCart = useCallback(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(storedCart);
    } catch (error) {
      console.error('Error al leer el carrito:', error);
      setCart([]);
    }
  }, []);

  const updateCart = useCallback((newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    // Si se actualiza fuera del contexto se despacha un evento personalizado
    document.dispatchEvent(new Event('cartUpdated'));
  }, []);

  useEffect(() => {
    refreshCart();

    const handleStorage = () => refreshCart();
    const handleCartUpdated = () => refreshCart();

    window.addEventListener('storage', handleStorage);
    document.addEventListener('cartUpdated', handleCartUpdated);

    return () => {
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener('cartUpdated', handleCartUpdated);
    };
  }, [refreshCart]);

  return (
    <CartContext.Provider value={{ cart, updateCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};
