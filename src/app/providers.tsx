import { AuthProvider } from "@/contexts/auth/AuthContext";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="bottom-right" // abajo derecha
        toastOptions={{
          duration: 4000,
          style: {
            fontWeight: "600",
          },
        }}
      />
    </AuthProvider>
  );
}