import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Category } from '../model/category.entity';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

const categoryEndPointPath = environment.categoryEndPointPath;

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService extends BaseService<Category> {
  private categorySubject = new BehaviorSubject<Category[]>([]);
  category$ = this.categorySubject.asObservable();

  constructor() {
    super();
    this.resourceEndPoint = categoryEndPointPath;
    this.loadCategories();
  }

  loadCategories() {
    this.getAll().subscribe({
      next: (categories: Category[]) => {
        this.categorySubject.next(categories);
      },
      error: (error: Error) => {
        console.error("Error getting categories", error);
      }
    });
  }

  createCategory(category: Category): Observable<Category> {
    return this.create(category).pipe(
      tap(newCategory => {
        const currentCategories = this.categorySubject.value;
        this.categorySubject.next([...currentCategories, newCategory]);
      })
    );
  }

  deleteCategory(id: string): Observable<void> {
    return this.delete(id).pipe(
      tap(() => {
        const updatedList = this.categorySubject.value.filter((category) => category.id !== id);
        this.categorySubject.next(updatedList);
      }),
      map(() => void 0)
    );
  }

  updateCategoryLocally(updatedCategory: Category) {
    const currentCategories = this.categorySubject.getValue();
    const i = currentCategories.findIndex((category) => category.id === updatedCategory.id);
    if (i !== -1) {
      currentCategories[i] = updatedCategory;
    } else {
      currentCategories.push(updatedCategory);
    }
    this.categorySubject.next([...currentCategories]);
  }

  setInitialCategories(categories: Category[]) {
    this.categorySubject.next(categories);
  }
}
