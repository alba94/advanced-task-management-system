import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./pages/admin-page/admin-page.component')).AdminPageComponent,
  },
];
