import { Routes } from '@angular/router';
import { Inventory } from './pages/inventory/inventory';
import { Login } from './pages/login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'inventory',
    component: Inventory
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
