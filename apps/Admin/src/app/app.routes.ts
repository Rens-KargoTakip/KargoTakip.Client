import { Route } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: 'kargolar',
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/kargolar/kargolar.component'),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./pages/kargolar/create/create-cargo.component'),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./pages/kargolar/create/create-cargo.component'),
          },
        ],
      },
    ],
  },
];
