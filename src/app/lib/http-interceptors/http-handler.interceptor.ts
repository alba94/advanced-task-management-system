import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { of, tap } from 'rxjs';

export const httpResponseHandlerInterceptor: HttpInterceptorFn = (
  req,
  next,
) => {

  const authReq = req.clone({
    headers: req.headers.set('Access-Control-Allow-Origin', '*')
  });

  return next(authReq).pipe(
    tap((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          console.error('Ju lutem autentifikohuni perseri');
        }
      }
      return of(null);
    }),
  );
};
