import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import { Order } from '../model/order.entity';

const orderEndPointPath = environment.orderEndPointPath;

@Injectable({
  providedIn: 'root'
})
export class OrderApiService extends BaseService<Order> {
  private orderSubject = new BehaviorSubject<Order[]>([]);
  order$ = this.orderSubject.asObservable();

  constructor() {
    super();
    this.resourceEndPoint = orderEndPointPath;
    this.loadOrders();
  }

  loadOrders() {
    this.getAll().subscribe({
      next: (orders: Order[]) => {
        this.orderSubject.next(orders);
      },
      error: (error: Error) => {
        console.error("Error getting orders", error);
      }
    });
  }

  createOrder(order: Order): Observable<Order> {
    return this.create(order).pipe(
      tap(newOrder => {
        const currentOrders = this.orderSubject.value;
        this.orderSubject.next([...currentOrders, newOrder]);
      })
    );
  }

  deleteOrder(id: string): Observable<void> {
    return this.delete(id).pipe(
      tap(() => {
        const updatedList = this.orderSubject.value.filter(order => order.id !== id);
        this.orderSubject.next(updatedList);
      }),
      map(() => void 0)
    );
  }

  updateOrderLocally(updatedOrder: Order) {
    const currentOrders = this.orderSubject.getValue();
    const i = currentOrders.findIndex(order => order.id === updatedOrder.id);
    if (i !== -1) {
      currentOrders[i] = updatedOrder;
    } else {
      currentOrders.push(updatedOrder);
    }
    this.orderSubject.next([...currentOrders]);
  }

  setInitialOrders(orders: Order[]) {
    this.orderSubject.next(orders);
  }
}
