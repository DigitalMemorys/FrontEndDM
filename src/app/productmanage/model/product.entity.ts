export class Product {
  id: string = "";
  unitPrice: number = 0;
  unitInStock: number = 0;
  unitOnOrder: number = 0;
  discontinued: boolean = false;
  category_id: string = "";
  image_url: string = "";

  constructor(product: {
    id?: string,
    unitPrice?: number,
    unitInStock?: number,
    unitOnOrder?: number,
    discontinued?: boolean,
    category_id?: string
    image_url?: string
  }) {
    this.id = product.id || "";
    this.unitPrice = product.unitPrice || 0;
    this.unitInStock = product.unitInStock || 0;
    this.unitOnOrder = product.unitOnOrder || 0;
    this.discontinued = product.discontinued || false;
    this.category_id =  product.category_id || "";
    this.image_url = product.image_url || "";
  }
}
