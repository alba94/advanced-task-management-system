import {
  ApplicationConfig,
  LOCALE_ID,
  importProvidersFrom,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';

import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_STORE_PROVIDERS } from '@store/providers';
import { routes } from './app.routes';
import { httpResponseHandlerInterceptor } from '@lib/http-interceptors/http-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    // provideHttpClient(withInterceptors([httpResponseHandlerInterceptor])),
    provideHttpClient(),
    importProvidersFrom([
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) =>
            new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient],
        },
      }),
    ]),
    ...APP_STORE_PROVIDERS,
    {
      provide: LOCALE_ID,
      useValue: 'en',
    },
  ],
};
