export class Order {
  id: string = "";
  order_date: string = "";
  ship_name: string = "";
  ship_address: string = "";
  ship_city: string = "";
  ship_region: string = "";
  ship_country: string = "";
  ship_date: string = "";
  user_id: string = "";

  constructor(order: {
    id?: string,
    order_date?: string,
    ship_name?: string,
    ship_address?: string,
    ship_city?: string,
    ship_region?: string,
    ship_country?: string,
    ship_date?: string,
    user_id?: string
  }) {
    this.id = order.id || "";
    this.order_date = order.order_date || "";
    this.ship_name = order.ship_name || "";
    this.ship_address = order.ship_address || "";
    this.ship_city = order.ship_city || "";
    this.ship_region = order.ship_region || "";
    this.ship_country = order.ship_country || "";
    this.ship_date = order.ship_date || "";
    this.user_id = order.user_id || "";
  }
}
