import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {OrderDetail} from '../model/orderDetail';

const orderDetailEndPointPath = environment.orderDetailEndPointPath;

@Injectable({
  providedIn: 'root'
})
export class OrderDetailApiService extends BaseService<OrderDetail> {
  private orderDetailSubject = new BehaviorSubject<OrderDetail[]>([]);
  orderDetails$ = this.orderDetailSubject.asObservable();

  constructor() {
    super();
    this.resourceEndPoint = orderDetailEndPointPath;
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    this.getAll().subscribe({
      next: (details) => this.orderDetailSubject.next(details),
      error: (err) => console.error('Error getting order details', err)
    });
  }

  createOrderDetail(detail: OrderDetail): Observable<OrderDetail> {
    return this.create(detail).pipe(
      tap(newDetail => {
        const current = this.orderDetailSubject.value;
        this.orderDetailSubject.next([...current, newDetail]);
      })
    );
  }

  deleteOrderDetail(id: string): Observable<void> {
    return this.delete(id).pipe(
      tap(() => {
        const updated = this.orderDetailSubject.value.filter(d => d.product_id !== id);
        this.orderDetailSubject.next(updated);
      }),
      map(() => void 0)
    );
  }

  updateOrderDetailLocally(updatedDetail: OrderDetail) {
    const list = [...this.orderDetailSubject.getValue()];
    const index = list.findIndex(d => d.product_id === updatedDetail.product_id);
    if (index !== -1) list[index] = updatedDetail;
    else list.push(updatedDetail);
    this.orderDetailSubject.next(list);
  }

  setInitialOrderDetails(details: OrderDetail[]) {
    this.orderDetailSubject.next(details);
  }
}
