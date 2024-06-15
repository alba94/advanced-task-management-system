import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./login/login.component')).LoginComponent,
  },
];
