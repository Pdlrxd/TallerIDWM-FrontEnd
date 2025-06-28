import React, { createContext } from "react";
import { CartItem } from "@/interfaces/CartItem";

interface CartContextType {
    cartItems: CartItem[];
    total: number;
    loading: boolean;
    fetchCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    total: 0,
    loading: true,
    fetchCart: async () => { },
});
