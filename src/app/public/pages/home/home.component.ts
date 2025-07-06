import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCard, MatCardContent} from '@angular/material/card';
import {Product} from '../../../productmanage/model/product.entity';
import {Category} from '../../../productmanage/model/category.entity';
import {ProductApiService} from '../../../productmanage/services/product-api.service';
import {CategoryApiService} from '../../../productmanage/services/category-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardContent, MatCard],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = 'home';

  protected product !: Product;

  protected productSource: Product[] = [];

  randomProducts: Product[] = [];

  private productService = inject(ProductApiService)

  constructor() {
    this.product = new Product({});
  }

  totalAmount = 0;
  productsAmount = 0;

  ngOnInit() {

    this.productService.product$.subscribe(products => {
      this.productSource = products;
    })

    this.getRandomProducts();

  }

  getRandomProducts() {
    if (this.productSource.length >= 3) {
      const shuffled = [...this.productSource].sort(() => 0.5 - Math.random());
      this.randomProducts = shuffled.slice(0, 3);
    } else {
      this.randomProducts = this.productSource;
    }
  }

}
