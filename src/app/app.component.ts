import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from '@lib/components/layouts/main-layout/main-layout.component';
import { AuthService } from '@lib/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isAuthenticated$ = inject(AuthService).isAuthenticated();
}
