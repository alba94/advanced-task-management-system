import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./pages/dashboard.component')).DashboardComponent,
  },
];
