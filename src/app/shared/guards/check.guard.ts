import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const checkGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService)
  const router        = inject(Router);

  const token = cookieService.get('token')
  
  if(token){
    return true

  }else{
    router.navigate(['/login']);
    return false;
  }
};
