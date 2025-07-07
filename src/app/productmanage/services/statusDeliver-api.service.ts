import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {StatusDeliver} from '../model/statusDeliver';

const statusDeliverEndPointPath = environment.statusDeliverEndPointPath;

@Injectable({
  providedIn: 'root'
})
export class StatusDeliverApiService extends BaseService<StatusDeliver> {
  private statusSubject = new BehaviorSubject<StatusDeliver[]>([]);
  status$ = this.statusSubject.asObservable();

  constructor() {
    super();
    this.resourceEndPoint = statusDeliverEndPointPath;
    this.loadStatuses();
  }

  loadStatuses() {
    this.getAll().subscribe({
      next: (statuses) => this.statusSubject.next(statuses),
      error: (error) => console.error('Error getting statusDeliver', error)
    });
  }

  createStatus(status: StatusDeliver): Observable<StatusDeliver> {
    return this.create(status).pipe(
      tap(newStatus => {
        const current = this.statusSubject.value;
        this.statusSubject.next([...current, newStatus]);
      })
    );
  }

  deleteStatus(id: string): Observable<void> {
    return this.delete(id).pipe(
      tap(() => {
        const updated = this.statusSubject.value.filter(status => status.id !== id);
        this.statusSubject.next(updated);
      }),
      map(() => void 0)
    );
  }

  updateStatusLocally(updatedStatus: StatusDeliver) {
    const list = [...this.statusSubject.getValue()];
    const index = list.findIndex(s => s.id === updatedStatus.id);
    if (index !== -1) list[index] = updatedStatus;
    else list.push(updatedStatus);
    this.statusSubject.next(list);
  }

  setInitialStatuses(statuses: StatusDeliver[]) {
    this.statusSubject.next(statuses);
  }
}
