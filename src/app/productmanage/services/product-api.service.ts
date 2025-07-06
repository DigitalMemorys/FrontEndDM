import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {Product} from '../model/product.entity';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';

const productEndPointPath = environment.productEndPointPath;

@Injectable({
  providedIn: 'root'
})
export class ProductApiService extends BaseService<Product>{
  private productSubject = new BehaviorSubject<Product[]>([]);
  product$ = this.productSubject.asObservable();

  constructor() {
    super();
    this.resourceEndPoint = productEndPointPath;
    this.loadProducts();
  }

  loadProducts() {
    this.getAll().subscribe({
      next: (products: Product[]) => {
        this.productSubject.next(products);
      },
      error: (error: Error) => {
        console.error("Error getting products", error);
      }
    })
  }

  createProduct(product: Product): Observable<Product> {
    return this.create(product).pipe(
      tap(newProduct => {
        const currentProduct = this.productSubject.value;
        this.productSubject.next([...currentProduct, newProduct]);
      })
    );
  }

  deleteProduct(id: string): Observable<void> {
    return this.delete(id).pipe(
      tap(() => {
        const updatedList = this.productSubject.value.filter((product) => product.id !== id);
        this.productSubject.next(updatedList);
      }),
      map(() => void 0)
    )
  }

  updatedProductLocally(updatedProduct: Product){
    const currentProduct = this.productSubject.getValue();
    const i = currentProduct.findIndex((product) => product.id === updatedProduct.id);
    if (i === -1) {
      currentProduct[i] = updatedProduct;
    }else {
      currentProduct.push(updatedProduct);
    }
    this.productSubject.next([...currentProduct]);
  }

  setInitialProducts(products: Product[]) {
    this.productSubject.next(products);
  }
}
