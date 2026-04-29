import { Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { BuildingsPage } from './pages/buildings/buildings';
import { FoodPage } from './pages/food/food';
import { HistoryPage } from './pages/history/history';
import { HomePage } from './pages/home/home';
import { Login } from './pages/login/login';
import { MapPage } from './pages/map/map';
import { PeoplePage } from './pages/people/people';
import { TreasuryPage } from './pages/treasury/treasury';
import { WeaponsPage } from './pages/weapons/weapons';

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
        component: HomePage
      },
      {
        path: 'map',
        component: MapPage
      },
      {
        path: 'people',
        component: PeoplePage
      },
      {
        path: 'treasury',
        component: TreasuryPage
      },
      {
        path: 'food',
        component: FoodPage
      },
      {
        path: 'weapons',
        component: WeaponsPage
      },
      {
        path: 'buildings',
        component: BuildingsPage
      },
      {
        path: 'history',
        component: HistoryPage
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'app/home'
  }
];
