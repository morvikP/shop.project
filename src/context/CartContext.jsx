import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem("cartItems");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Error loading cartItems from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cartItems to localStorage:", error);
    }
  }, [cartItems]);

  function addToCart(product) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
            ? { ...item, quantity: item.quantity + (Number(product.quantity) || 1) }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: Number(product.quantity) || 1 }];
      }
    });
    alert(`${product.title} добавлен в корзину!`);
  }

  function removeProduct(productId, size, color) {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === productId && item.size === size && item.color === color)
      )
    );
    alert("Товар удален из корзины!");
  }

  function incrementQuantity(productId, size, color) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decrementQuantity(productId, size, color) {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function resetCart() {
    setCartItems([]);
  }

  // Защита от NaN через Number() и fallback в 0
  const totalQuantity = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
    resetCart,
    totalQuantity,
    totalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
