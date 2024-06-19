import { Routes } from '@angular/router';
import { UserRole } from '@lib/enums/task';
import { AuthGuard } from '@lib/guards/auth.guard';

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
    path: 'admin',
    loadChildren: async () =>
      (await import('@routes/dashboard/dashboard.routes')).ROUTES,
    canLoad: [AuthGuard.canLoad],
    data: { roles: [UserRole.ADMIN] },
  },
  {
    path: 'dashboard',
    loadChildren: async () =>
      (await import('@routes/dashboard/dashboard.routes')).ROUTES,
      canLoad: [AuthGuard.canLoad],
    // canActivate: [AuthGuard.canActivate],
    // data: { roles: [UserRole.ADMIN] },
  },
  {
    path: 'boards',
    loadChildren: async () =>
      (await import('@routes/task-manager/task-manager.routes')).ROUTES,
    canActivate: [AuthGuard.canActivate],
    data: { roles: [UserRole.USER, UserRole.ADMIN] },
  },
  {
    path: '**',
    loadComponent: async () => (await import('@routes/not-found/not-found.component')).NotFoundComponent
  },
];
