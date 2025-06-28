import { AuthProvider } from "@/contexts/auth/AuthContext";
import { CartProvider } from "@/contexts/cartContext/CartProvider";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{ duration: 4000, style: { fontWeight: "600" } }}
        />
      </CartProvider>
    </AuthProvider>
  );
}
