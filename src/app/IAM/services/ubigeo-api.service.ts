import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import {UbiGeo} from '../model/ubigeo.entity';

const ubiGeoEndPointPath = environment.ubiGeoEndPointPath;

@Injectable({
  providedIn: 'root'
})
export class UbiGeoApiService extends BaseService<UbiGeo> {
  private ubiGeoSubject = new BehaviorSubject<UbiGeo[]>([]);
  ubiGeo$ = this.ubiGeoSubject.asObservable();

  constructor() {
    super();
    this.resourceEndPoint = ubiGeoEndPointPath;
    this.loadUbiGeo();
  }

  loadUbiGeo() {
    this.getAll().subscribe({
      next: (data: UbiGeo[]) => {
        this.ubiGeoSubject.next(data);
      },
      error: (error: Error) => {
        console.error("Error getting UbiGeo", error);
      }
    });
  }

  createUbiGeo(ubiGeo: UbiGeo): Observable<UbiGeo> {
    return this.create(ubiGeo).pipe(
      tap(newItem => {
        const current = this.ubiGeoSubject.value;
        this.ubiGeoSubject.next([...current, newItem]);
      })
    );
  }

  deleteUbiGeo(id: string): Observable<void> {
    return this.delete(id).pipe(
      tap(() => {
        const updated = this.ubiGeoSubject.value.filter(item => item.id !== id);
        this.ubiGeoSubject.next(updated);
      }),
      map(() => void 0)
    );
  }

  updateUbiGeoLocally(updated: UbiGeo) {
    const current = this.ubiGeoSubject.getValue();
    const i = current.findIndex(item => item.id === updated.id);
    if (i !== -1) {
      current[i] = updated;
    } else {
      current.push(updated);
    }
    this.ubiGeoSubject.next([...current]);
  }

  setInitialUbiGeo(data: UbiGeo[]) {
    this.ubiGeoSubject.next(data);
  }
}
