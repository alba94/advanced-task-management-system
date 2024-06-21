import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@lib/components/layouts/main-layout/main-layout.component';
import { UserRole } from '@lib/enums/task';
import { AuthGuard } from '@lib/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: async () =>
      (await import('@routes/authentication/auth.routes')).ROUTES,
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [AuthGuard.canActivateChild],
    canActivate: [AuthGuard.canActivate],
    children: [
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
        data: { roles: [UserRole.USER] },
      },
      {
        path: 'boards',
        loadChildren: async () =>
          (await import('@routes/task-manager/task-manager.routes')).ROUTES,
        data: { roles: [UserRole.USER, UserRole.ADMIN] },
      },
    ],
  },
  {
    path: '**',
    loadComponent: async () =>
      (await import('@routes/not-found/not-found.component')).NotFoundComponent,
  },
];
