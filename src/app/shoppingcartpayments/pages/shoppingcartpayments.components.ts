import {MatCard, MatCardContent} from '@angular/material/card';
import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Product} from '../../productmanage/model/product.entity';
import {Category} from '../../productmanage/model/category.entity';
import {StatusDeliver} from '../../productmanage/model/statusDeliver';
import {OrderDetail} from '../../productmanage/model/orderDetail';
import {ProductApiService} from '../../productmanage/services/product-api.service';
import {CategoryApiService} from '../../productmanage/services/category-api.service';
import {StatusDeliverApiService} from '../../productmanage/services/statusDeliver-api.service';
import {OrderDetailApiService} from '../../productmanage/services/orderDetail-api.service';
import {Order} from '../model/order.entity';
import {OrderApiService} from '../services/order-api.service';
import {
  ShowInfoProductsComponent
} from '../../productmanage/components/show-info-products/show-info-products.component';
import {ShowOrderInfoComponent} from '../components/show-order-info/show-order-info.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ShowOrderInfoComponent,
  ],
  templateUrl: './shoppingcartpayments.components.html',
  styleUrls: ['./shoppingcartpayments.components.css']
})
export class ShoppingcartpaymentsComponent implements OnInit {
  name = "showOrderInfoComponent";

  protected product !: Product;
  protected category !: Category;
  protected statusDeliver !: StatusDeliver;
  protected orderDetail !: OrderDetail;
  protected order !: Order;

  protected productSource: Product[] = [];
  protected categorySource: Category[] = [];
  protected statusDeliverSource: StatusDeliver[] = [];
  protected orderDetailSource: OrderDetail[] = [];
  protected orderSource: Order[] = [];

  private productService = inject(ProductApiService)
  private categoryService = inject(CategoryApiService)
  private statusDeliverService = inject(StatusDeliverApiService)
  private orderDetailService = inject(OrderDetailApiService)
  private orderService = inject(OrderApiService)

  constructor() {
    this.product = new Product({});
    this.category = new Category({});
    this.statusDeliver = new StatusDeliver({});
    this.orderDetail = new OrderDetail({});
    this.order = new Order({});
  }

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
      this.orderDetailSource = orderDetail;
    })

    this.orderService.order$.subscribe(order => {
      this.orderSource = order;
    })

  }
}
