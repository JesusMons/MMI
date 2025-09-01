// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User } from './services/user';  // tu servicio de auth
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(User);     // 👈 aquí inyectamos el servicio
  const router = inject(Router);

  return userService.helloFromCookie().pipe(
    map(() => true),                   // ✅ token válido → dejar pasar
    catchError(() => {
      router.navigate(['/login']);     // ❌ error → redirigir a login
      return of(false);
    })
  );
};
