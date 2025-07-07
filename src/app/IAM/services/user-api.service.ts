import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import { User } from '../model/user.entity';

const userEndPointPath = environment.userEndPointPath;

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends BaseService<User> {
  private userSubject = new BehaviorSubject<User[]>([]);
  user$ = this.userSubject.asObservable();

  constructor() {
    super();
    this.resourceEndPoint = userEndPointPath;
    this.loadUsers();
  }

  loadUsers() {
    this.getAll().subscribe({
      next: (users: User[]) => {
        this.userSubject.next(users);
      },
      error: (error: Error) => {
        console.error("Error getting users", error);
      }
    });
  }

  createUser(user: User): Observable<User> {
    return this.create(user).pipe(
      tap(newUser => {
        const currentUsers = this.userSubject.value;
        this.userSubject.next([...currentUsers, newUser]);
      })
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.delete(id).pipe(
      tap(() => {
        const updatedList = this.userSubject.value.filter(user => user.id !== id);
        this.userSubject.next(updatedList);
      }),
      map(() => void 0)
    );
  }

  updateUserLocally(updatedUser: User) {
    const currentUsers = this.userSubject.getValue();
    const i = currentUsers.findIndex(user => user.id === updatedUser.id);
    if (i !== -1) {
      currentUsers[i] = updatedUser;
    } else {
      currentUsers.push(updatedUser);
    }
    this.userSubject.next([...currentUsers]);
  }

  setInitialUsers(users: User[]) {
    this.userSubject.next(users);
  }
}
