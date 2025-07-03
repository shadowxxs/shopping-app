
import React, { createContext, useEffect, useState } from 'react'
import { getCart, clearCart as clearCartStorage } from '../storage/storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getCart());

  useEffect(() => {
    setCartItems(getCart());
}, []);

const addToCart = (product) => {
  const exist = cartItems.find(item => item.id === product.id);
  let updated;
  if (exist) {
    updated = cartItems.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
    );
  } else {
    updated = [...cartItems, product];
    
}
setCartItems(updated);
 alert(`${product.name} berhasil ditambahkan`)
};

const updateQuantity = (productId, quantity) => {
  const updated = cartItems.map(item =>
    item.id === productId ? { ...item, quantity }: item ).filter(item => item.quantity > 0);
    setCartItems(updated);
  };

const clearCart = () => {
  clearCartStorage();
  setCartItems([]);
};

const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, totalItems, updateQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};