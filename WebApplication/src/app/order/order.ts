
export class Order {
  public _id: string;
  public orderCreationDate: string;
  constructor(
    public customerName: string,
    public customerEmail: string,
    public customerAddress: string,
    public cartTotalPrice: number,
    public cartItems: { productId: string; productQuantity: number }[]
  ) {}
}
