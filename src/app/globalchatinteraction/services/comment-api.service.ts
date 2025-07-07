import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import {CommentE} from '../model/comment.entity';

const commentEndPointPath = environment.commentEndPointPath;

@Injectable({
  providedIn: 'root'
})
export class CommentApiService extends BaseService<CommentE> {
  private commentSubject = new BehaviorSubject<CommentE[]>([]);
  comment$ = this.commentSubject.asObservable();

  constructor() {
    super();
    this.resourceEndPoint = commentEndPointPath;
    this.loadComments();
  }

  loadComments() {
    this.getAll().subscribe({
      next: (data: CommentE[]) => {
        this.commentSubject.next(data);
      },
      error: (error: Error) => {
        console.error("Error getting comments", error);
      }
    });
  }

  createComment(comment: CommentE): Observable<CommentE> {
    return this.create(comment).pipe(
      tap(newItem => {
        const current = this.commentSubject.value;
        this.commentSubject.next([...current, newItem]);
      })
    );
  }

  deleteComment(id: string): Observable<void> {
    return this.delete(id).pipe(
      tap(() => {
        const updated = this.commentSubject.value.filter(item => item.id !== id);
        this.commentSubject.next(updated);
      }),
      map(() => void 0)
    );
  }

  updateCommentLocally(updated: CommentE) {
    const current = this.commentSubject.getValue();
    const i = current.findIndex(item => item.id === updated.id);
    if (i !== -1) {
      current[i] = updated;
    } else {
      current.push(updated);
    }
    this.commentSubject.next([...current]);
  }

  setInitialComments(data: CommentE[]) {
    this.commentSubject.next(data);
  }
}
