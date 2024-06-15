import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: async () =>
      (await import('@routes/authentication/auth.routes')).ROUTES,
  },
  {
    path: 'dashboard',
    loadChildren: async () =>
      (await import('@routes/dashboard/dashboard.routes')).ROUTES,
  },
  {
    path: 'boards',
    loadChildren: async () =>
      (await import('@routes/task-manager/task-manager.routes')).ROUTES,
  },
];
