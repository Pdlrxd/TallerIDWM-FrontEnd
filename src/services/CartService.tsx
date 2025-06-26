import { ApiBackend } from "@/clients/axios";

export class CartService {
  static async addToCart(productId: number, quantity: number, token: string) {
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
      return response;
    } catch (error) {
      throw error;
    }
  }
}
