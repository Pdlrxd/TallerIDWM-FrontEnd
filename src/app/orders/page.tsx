"use client";

import { ViewOrdersPage } from "@/views/orderPage/ViewOrderPage";
import { AuthGuardClient } from "@/components/AuthGuardClient";

export default function OrdersPage() {
  return (
    <AuthGuardClient>
      <ViewOrdersPage />
    </AuthGuardClient>
  );
}
