import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router)
  const authService = inject(AuthService)

  if (!authService.isLogged()) router.navigate(['/login'])

  return authService.isLogged()
}
