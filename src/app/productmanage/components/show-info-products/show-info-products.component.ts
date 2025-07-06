import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Product} from '../../model/product.entity';
import {ProductApiService} from '../../services/product-api.service';
import {Category} from '../../model/category.entity';
import {CategoryApiService} from '../../services/category-api.service';
import {MatCard, MatCardContent} from '@angular/material/card';

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

  protected productSource: Product[] = [];
  protected categorySource: Category[] = [];

  private productService = inject(ProductApiService)
  private categoryService = inject(CategoryApiService)

  constructor() {
    this.product = new Product({});
    this.category = new Category({});
  }

  totalAmount = 0;
  productsAmount = 0;

  ngOnInit() {

    this.productService.product$.subscribe(products => {
      this.productSource = products;
    })

    this.categoryService.category$.subscribe(category => {
      this.categorySource = category;
    })

  }

  selectProduct(e: number) {
    this.totalAmount += e;
    this.productsAmount++;
  }

}
