import { ReactNode } from "react";
import { AuthGuardAdmin } from "@/components/AuthGuardAdmin";
import { Navbar } from "@/components/Navbar";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <AuthGuardAdmin>
      <Navbar />
      <main className="min-h-screen p-6 bg-gray-50">{children}</main>
    </AuthGuardAdmin>
  );
}
