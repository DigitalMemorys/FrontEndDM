import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import { Publishing } from '../model/publishing.entity';

const publishingEndPointPath = environment.publishingEndPointPath;

@Injectable({
  providedIn: 'root'
})
export class PublishingApiService extends BaseService<Publishing> {
  private publishingSubject = new BehaviorSubject<Publishing[]>([]);
  publishing$ = this.publishingSubject.asObservable();

  constructor() {
    super();
    this.resourceEndPoint = publishingEndPointPath;
    this.loadPublishing();
  }

  loadPublishing() {
    this.getAll().subscribe({
      next: (data: Publishing[]) => {
        this.publishingSubject.next(data);
      },
      error: (error: Error) => {
        console.error("Error getting publishing", error);
      }
    });
  }

  createPublishing(publishing: Publishing): Observable<Publishing> {
    return this.create(publishing).pipe(
      tap(newItem => {
        const current = this.publishingSubject.value;
        this.publishingSubject.next([...current, newItem]);
      })
    );
  }

  deletePublishing(id: string): Observable<void> {
    return this.delete(id).pipe(
      tap(() => {
        const updated = this.publishingSubject.value.filter(item => item.id !== id);
        this.publishingSubject.next(updated);
      }),
      map(() => void 0)
    );
  }

  updatePublishingLocally(updated: Publishing) {
    const current = this.publishingSubject.getValue();
    const i = current.findIndex(item => item.id === updated.id);
    if (i !== -1) {
      current[i] = updated;
    } else {
      current.push(updated);
    }
    this.publishingSubject.next([...current]);
  }

  setInitialPublishing(data: Publishing[]) {
    this.publishingSubject.next(data);
  }
}
