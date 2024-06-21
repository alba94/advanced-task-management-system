import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { languageItems, navElements } from '@lib/constants/task.const';
import { IfUserHasRoleDirective } from '@lib/directives/if-user-authenticated.directive';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AuthActions } from '@store/auth/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    IfUserHasRoleDirective,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly _translateService = inject(TranslateService);
  menuItems = navElements;
  languages = languageItems;
  selectedLanguage = this.languages[0].code;

  ngOnInit(): void {
    this._translateService.setDefaultLang(this.selectedLanguage);
  }

  logout() {
    this._store.dispatch(AuthActions.logout());
  }

  changeLanguage(language: string): void {
    this._translateService.use(language);
  }
}
