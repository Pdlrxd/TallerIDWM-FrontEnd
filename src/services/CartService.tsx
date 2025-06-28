import { ApiBackend } from "./axios"; // o donde tengas el cliente axios configurado

export const CartService = {
  addToCart: async (productId: number, quantity: number, token: string) => {
    try {
      const response = await ApiBackend.post(
        "cart/add",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Error agregando producto al carrito");
      }

      return response.data;
    } catch (error: any) {
      console.error("Error en addToCart:", error);
      throw error;
    }
  },
  async getCart(token: string) {
    const res = await ApiBackend.get("cart/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  async removeFromCart(productId: number, token: string) {
    return ApiBackend.delete(`/cart/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
};
