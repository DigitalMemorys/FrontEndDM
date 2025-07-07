export class CartItem {
  productId: string = "";
  name: string = "";
  price: number = 0;
  quantity: number = 0;
  imageUrl: string = "";

  constructor(init?: Partial<CartItem>) {
    Object.assign(this, init);
  }
}
