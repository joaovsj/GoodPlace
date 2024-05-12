import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@services/auth.service';

export const checkGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService)
  const authService = inject(AuthService)
  const router        = inject(Router);

  const token = cookieService.get('token')
  
  if(token){

    const data = authService.logged$().subscribe()

    if(data){ 
      return true  
    }
  }

  router.navigate(['/login']);
  return false;

};
