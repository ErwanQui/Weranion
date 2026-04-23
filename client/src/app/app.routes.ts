import { Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { Home } from './pages/home/home';
import { Inventory } from './pages/inventory/inventory';
import { Login } from './pages/login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'app',
    canActivateChild: [LoginGuard],
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'inventory',
        component: Inventory
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'app/home'
  }
];
