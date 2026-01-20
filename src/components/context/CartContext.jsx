import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {

    // Favorites
 const [favorites, setFavorites] = useState(() => {
    const savedFav = localStorage.getItem("favoritesItems");
    return savedFav ? JSON.parse(savedFav) : [];
  });

  const addToFavorites = (item) => {
    setFavorites((prev) => {
        if(prev.some((i) => i.id === item.id)) return prev;
        return [...prev, item]
    })
  }

  useEffect(() => {
    localStorage.setItem("favoritesItems" , JSON.stringify(favorites))
  }, [favorites])

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((i) => i.id !== id))
  }









    // cart
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // increaseQuantity
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // decreaseQuantity
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // removeFromCart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        addToFavorites,
        favorites,
        removeFromFavorites
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
