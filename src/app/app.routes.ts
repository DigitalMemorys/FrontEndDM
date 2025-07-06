import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { HomeComponent } from './public/pages/home/home.component';
const ProductManageComponent = () => import('./productmanage/pages/productmanage.component').then(m => m.ProductmanageComponent);

export const routes: Routes = [

  { path: 'home', component: HomeComponent },

  { path: 'productManage', loadComponent: ProductManageComponent, title: 'ProductManage' },

  { path: '', component: PageNotFoundComponent },

];
