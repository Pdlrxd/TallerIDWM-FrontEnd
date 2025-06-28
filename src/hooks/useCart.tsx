import { useContext } from "react";
import { CartContext } from "@/contexts/cartContext/CartContext";

export const useCart = () => {
  return useContext(CartContext);
};
