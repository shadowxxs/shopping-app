
import React, { createContext, useEffect, useState, useCallback, useMemo } from 'react';
import { getCart, saveCart, clearCart as clearCartStorage } from '../storage/storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getCart());

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    setCartItems(prevItems => {
      const exist = prevItems.find(item => item.id === product.id);
      if (exist) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      }
      return [...prevItems, product];
    });
    alert(`${product.name} berhasil ditambahkan`);
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    clearCartStorage();
    setCartItems([]);
  }, []);

  const totalItems = useMemo(() =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(() =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const contextValue = useMemo(() => ({
    cartItems,
    addToCart,
    clearCart,
    totalItems,
    updateQuantity,
    totalPrice
  }), [cartItems, addToCart, clearCart, totalItems, updateQuantity, totalPrice]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};