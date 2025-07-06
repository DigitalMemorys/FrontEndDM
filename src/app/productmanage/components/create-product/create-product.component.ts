import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCard, MatCardContent} from '@angular/material/card';
import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../model/product.entity';
import {Category} from '../../model/category.entity';
import {ProductApiService} from '../../services/product-api.service';
import {CategoryApiService} from '../../services/category-api.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIcon,
  ],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  name = "createProductComponent";

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

  ngOnInit() {

    this.productService.product$.subscribe(products => {
      this.productSource = products;
    })

    this.categoryService.category$.subscribe(category => {
      this.categorySource = category;
    })

  }

  @ViewChild('formAddProduct') formAddProduct!: ElementRef<HTMLFormElement>;

  addNewProduct() {
    let form = this.formAddProduct.nativeElement;
    form.classList.toggle('return-to-hide');
    form.classList.toggle('bring-to-front');
  };
  cancelAddNewProduct(){
    let form = this.formAddProduct.nativeElement;
    form.classList.toggle('bring-to-front');
    form.classList.toggle('return-to-hide');
  };

  registerProduct(){
    let form = this.formAddProduct.nativeElement;
    const imgInput = document.getElementById('nameZnInput') as HTMLInputElement;
    const priceInput = document.getElementById('price')as HTMLInputElement;
    const unitOnStockInput = document.getElementById('unitOnStock')as HTMLInputElement;
    const categoryInput = document.getElementById('category') as HTMLInputElement;
    const categoryDetailInput = document.getElementById('category-detail') as HTMLInputElement;

    let img = imgInput.value.trim();
    let price = priceInput.value.trim();
    let unit = unitOnStockInput.value.trim();
    let category = categoryInput.value.trim();
    let categoryDetail = categoryDetailInput.value.trim();

    if ( img.length > 0 && categoryDetail.length > 0 && unitOnStockInput.value.trim().length > 0 && price.length > 0) {
      let id = Math.floor(Math.random() * 1423 + 1345);
      let newCategory = new Category({
        id: id.toString(),
        category_name: category,
        description: categoryDetail
      });

      this.categoryService.createCategory(newCategory).subscribe();

      let newProduct = new Product({
        id: Math.floor(Math.random() * 1423 + 1345).toString(),
        unitPrice: Number(price),
        unitInStock: Number(unit),
        unitOnOrder: 10,
        discontinued: false,
        category_id: newCategory.id,
        image_url: img
      })

      this.productService.createProduct(newProduct).subscribe({
        next: () => {
          form.classList.toggle('return-to-hide');
           imgInput.value = "";
           priceInput.value = "";
           unitOnStockInput.value = "";
           categoryInput.value = "";
           categoryDetailInput.value = "";
        }
      })

    }

  }

}
