import { createContext, useState } from "react";

export const CartQtyContext = createContext();

export default function CartQtyProvider({ children }) {
  const [cartQuantity, setCartQuantity] = useState(1);

  return (
    <CartQtyContext.Provider value={{ cartQuantity, setCartQuantity }}>
      {children}
    </CartQtyContext.Provider>
  );
}
