import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  get cartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addItem(item: CartItem) {
    const items = [...this.cartItems];
    const idx = items.findIndex(i => i.productId === item.productId);
    if (idx > -1) {
      items[idx].quantity += item.quantity;
    } else {
      items.push(item);
    }
    this.cartItemsSubject.next(items);
  }

  removeItem(productId: string) {
    this.cartItemsSubject.next(this.cartItems.filter(i => i.productId !== productId));
  }

  clear() {
    this.cartItemsSubject.next([]);
  }
}
