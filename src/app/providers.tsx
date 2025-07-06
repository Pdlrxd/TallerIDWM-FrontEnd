import { AuthProvider } from "@/contexts/auth/AuthContext";
import { CartProvider } from "@/contexts/cartContext/CartProvider";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        {/* <Toaster /> aquí se elimina */}
      </CartProvider>
    </AuthProvider>
  );
}