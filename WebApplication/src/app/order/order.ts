
export class Order {
  constructor(
    public customerName: string,
    public customerEmail: string,
    public customerAddress: string,
    public cartTotalPrice: number,
    public cartItems: { productId: string; productQuantity: number }[]
  ) {}
}
