import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { HomeComponent } from './public/pages/home/home.component';
const ProductManageComponent = () => import('./productmanage/pages/productmanage.component').then(m => m.ProductmanageComponent);
const ShoppingCartPayments = () => import('./shoppingcartpayments/pages/shoppingcartpayments.components').then(m => m.ShowOrderInfoComponent);
const GlobalChatInteraction = () => import('./globalchatinteraction/pages/global-chat-interaction.component').then(m => m.GlobalChatInteractionComponent);

export const routes: Routes = [

  { path: 'home', component: HomeComponent },

  { path: 'productManage', loadComponent: ProductManageComponent, title: 'ProductManage' },

  { path: 'shoppingCart', loadComponent: ShoppingCartPayments, title: 'ShoppingCart' },

  { path: 'globalChat', loadComponent: GlobalChatInteraction, title: 'GlobalChat' },

  { path: '', component: PageNotFoundComponent },

];
