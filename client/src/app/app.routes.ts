import { Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { FoodPage } from './pages/food/food';
import { HistoryPage } from './pages/history/history';
import { HomePage } from './pages/home/home';
import { Login } from './pages/login/login';
import { Main } from './pages/main/main';
import { MapPage } from './pages/map/map';
import { PeoplePage } from './pages/people/people';
import { BaronyPage } from './pages/territory/baronies/barony/barony';
import { DuchyPage } from './pages/territory/duchies/duchy/duchy';
import { TerritoryPage } from './pages/territory/territory';
import { TreasuryPage } from './pages/treasury/treasury';
import { WeaponsPage } from './pages/weapons/weapons';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'app',
    component: Main,
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
        path: 'territories',
        children: [
          {
            path: '',
            component: TerritoryPage
          },
          {
            path: 'barony',
            component: BaronyPage
          },
          {
            path: 'barony/:id',
            component: BaronyPage
          },
          {
            path: 'duchy/:id',
            component: DuchyPage
          }
        ]
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
