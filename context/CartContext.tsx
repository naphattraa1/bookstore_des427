// context/CartContext.tsx
import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
  } from "react";
  
  export type Book = {
    id: string;
    title: string;
    author: string;
    publisher: string;
    isbn: string;
    price: number;
  };
  
  export type CartItem = Book & {
    qty: number;
  };
  
  type CartContextValue = {
    cart: CartItem[];
    addToCart: (book: Book) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
  };
  
  const CartContext = createContext<CartContextValue>({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    totalItems: 0,
    totalPrice: 0,
  });
  
  export const useCart = () => useContext(CartContext);
  
  type CartProviderProps = {
    children: ReactNode;
  };
  
  export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
  
    const addToCart = (book: Book) => {
      setCart((prev) => {
        const exists = prev.find((item) => item.id === book.id);
        if (exists) {
          return prev.map((item) =>
            item.id === book.id ? { ...item, qty: item.qty + 1 } : item
          );
        }
        return [...prev, { ...book, qty: 1 }];
      });
    };
  
    const removeFromCart = (id: string) => {
      setCart((prev) => prev.filter((item) => item.id !== id));
    };
  
    const clearCart = () => setCart([]);
  
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );
  
    const value: CartContextValue = {
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
    };
  
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
  };
  
  export default CartContext;