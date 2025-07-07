import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Product} from '../../model/product.entity';
import {ProductApiService} from '../../services/product-api.service';
import {Category} from '../../model/category.entity';
import {CategoryApiService} from '../../services/category-api.service';
import {MatCard, MatCardContent} from '@angular/material/card';
import {OrderDetail} from '../../model/orderDetail';
import {StatusDeliver} from '../../model/statusDeliver';
import {StatusDeliverApiService} from '../../services/statusDeliver-api.service';
import {OrderDetailApiService} from '../../services/orderDetail-api.service';
// Importa el CartService y la interfaz CartItem
import { CartService, CartItem } from '../../../shoppingcartpayments/services/cart.service';

@Component({
  selector: 'app-show-info-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCard,
    MatCardContent,
  ],
  templateUrl: './show-info-products.component.html',
  styleUrls: ['./show-info-products.component.css']
})

export class ShowInfoProductsComponent implements OnInit {
  name = "showInfoProducts";

  protected product !: Product;
  protected category !: Category;
  protected statusDeliver !: StatusDeliver;
  protected orderDetail !: OrderDetail;

  protected productSource: Product[] = [];
  protected categorySource: Category[] = [];
  protected statusDeliverSource: StatusDeliver[] = [];
  protected orderSource: OrderDetail[] = [];

  arrProductsIds: string[] = [];

  private productService = inject(ProductApiService)
  private categoryService = inject(CategoryApiService)
  private statusDeliverService = inject(StatusDeliverApiService)
  private orderDetailService = inject(OrderDetailApiService)
  // Inyecta el CartService
  private cartService = inject(CartService)

  constructor() {
    this.product = new Product({});
    this.category = new Category({});
    this.statusDeliver = new StatusDeliver({});
    this.orderDetail = new OrderDetail({});
  }

  totalAmount = 0;
  productsAmount = 0;
  status = ""

  ngOnInit() {

    this.productService.product$.subscribe(products => {
      this.productSource = products;
    })

    this.categoryService.category$.subscribe(category => {
      this.categorySource = category;
    })

    this.statusDeliverService.status$.subscribe(status => {
      this.statusDeliverSource = status;
    })

    this.orderDetailService.orderDetails$.subscribe(orderDetail => {
      this.orderSource = orderDetail;
    })

  }

  selectProduct(e: Product) {
    this.totalAmount += e.unitPrice;
    this.productsAmount++;
    this.arrProductsIds.push(e.id);

    // Agrega el producto al carrito compartido
    this.cartService.addItem({
      productId: e.id,
      name: e.id, // Aquí falta cambiar por el nombre del producto, de momento se usa el id
      price: e.unitPrice,
      quantity: 1,
      imageUrl: e.image_url
    });
  }

  generateId(): number{
    return Math.floor(Math.random() * 1423 + 1345);
  }

  registerProduct() {
    let amountOneProduct = 0;

    this.productSource.forEach(product => {
      let amountOneProduct = 0;

      this.arrProductsIds.forEach(productId => {
        if (productId === product.id) {
          amountOneProduct++;
        }
      });

      if (amountOneProduct > 0) {

        this.statusDeliverSource.forEach(sd =>{
          if (sd.type === "PENDING"){
            this.status = sd.id
          }
        })

        const newOrderDetail = new OrderDetail({
          id: this.generateId().toString(),
          unit_price: product.unitPrice,
          quantity: amountOneProduct,
          product_id: product.id,
          status_deliver_id: this.status,
          order_id: ""
        });

        this.orderDetailService.createOrderDetail(newOrderDetail).subscribe();
        this.totalAmount = 0;
        this.productsAmount = 0;
      }
    });

  }

}
