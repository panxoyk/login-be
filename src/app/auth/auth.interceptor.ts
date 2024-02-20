import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getToken()

  if (!authToken) return next(req)
  const newRequest = req.clone({ setHeaders: { 'Auth': `Bearer ${authToken}` } })

  return next(newRequest)
}
