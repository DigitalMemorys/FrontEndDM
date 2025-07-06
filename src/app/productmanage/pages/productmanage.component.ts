import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {Product} from '../model/product.entity';
import {ProductApiService} from '../services/product-api.service';
import {MatCard, MatCardContent} from '@angular/material/card';
import {ShowInfoProductsComponent} from '../components/show-info-products/show-info-products.component';
import {CreateProductComponent} from '../components/create-product/create-product.component';

@Component({
  selector: 'app-productmanage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIcon,
    ShowInfoProductsComponent,
    CreateProductComponent,
  ],
  templateUrl: './productmanage.component.html',
  styleUrls: ['./productmanage.component.css']
})

export class ProductmanageComponent implements OnInit {
  name="productmanage";

  @ViewChild(CreateProductComponent) createProductComponent !: CreateProductComponent;

  protected product !: Product;

  protected productSource: Product[] = [];

  private productService = inject(ProductApiService)

  constructor() {
    this.product = new Product({});
  }

  ngOnInit() {

    this.productService.product$.subscribe(products => {
      this.productSource = products;
    })

  }

  addNewProduct() {
    this.createProductComponent.addNewProduct();
  }


  deleteProduct(e: string) {

  }

}
