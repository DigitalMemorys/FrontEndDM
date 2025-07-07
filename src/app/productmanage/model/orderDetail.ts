export class OrderDetail {
  id: string = "";
  unit_price: number = 0;
  quantity: number = 0;
  product_id: string; // antes: product_id: string
  status_deliver_id: string = "";
  order_id: string = "";

  constructor(detail: {
    id?: string,
    unit_price?: number,
    quantity?: number,
    product_id?: string,
    status_deliver_id?: string,
    order_id?: string
  }) {
    this.id = detail.id || "";
    this.unit_price = detail.unit_price ?? 0;
    this.quantity = detail.quantity ?? 0;
    this.product_id = detail.product_id || "";
    this.status_deliver_id = detail.status_deliver_id || "";
    this.order_id = detail.order_id || "";
  }
}
