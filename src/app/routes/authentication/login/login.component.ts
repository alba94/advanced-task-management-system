import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AuthActions } from '@store/auth/auth.actions';
import { selectAuthError, selectAuthIsLoading } from '@store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _store = inject(Store);
  errorMessage$ = this._store.select(selectAuthError);
  isLoading$ = this._store.select(selectAuthIsLoading);

  form = this._fb.group({
    email: this._fb.control({ value: '', disabled: false }, [
      Validators.required,
      Validators.email,
    ]),
    password: this._fb.control({ value: '', disabled: false }, [
      Validators.required,
    ]),
  });

  get controls() {
    return this.form.controls;
  }

  onSubmit(): void {
    const { email, password } = this.form.getRawValue();
    if (this.form.valid) {
      this._store.dispatch(
        AuthActions.login({ user: { email, password }, isLoading: true }),
      );
    }
  }
}
