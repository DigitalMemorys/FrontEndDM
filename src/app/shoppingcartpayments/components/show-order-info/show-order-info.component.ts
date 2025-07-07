import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import {MatIcon} from '@angular/material/icon';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-show-order-info',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardContent],
  templateUrl: './show-order-info.component.html',
  styleUrls: ['./show-order-info.component.css']
})
export class ShowOrderInfoComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  private cartService = inject(CartService);

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.updateTotal();
    });
  }

  remove(productId: string) {
    this.cartService.removeItem(productId);
  }

  clear() {
    this.cartService.clear();
  }

  updateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
