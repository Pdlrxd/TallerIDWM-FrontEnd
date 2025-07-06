export interface ShippingAddress {
    street: string;
    number: string;
    commune: string;
    region: string;
    postalCode: string;
}

export interface ProductInOrder {
    productId: number;
    title: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    image: string | null;
}

export interface OrderDetail {
    id: number;
    orderNumber: string;
    purchaseDate: string;
    total: number;
    orderStatus: string;
    shippingAddress: ShippingAddress;
    products: ProductInOrder[];
}
