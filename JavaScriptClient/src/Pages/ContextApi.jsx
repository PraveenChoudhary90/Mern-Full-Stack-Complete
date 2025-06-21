// src/CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const ContextApi = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prev =>
      prev.some(p => p.serialId === item.serialId) ? prev : [...prev, item]
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
