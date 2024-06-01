import {CanActivateFn, Router} from '@angular/router';
import {LoginService} from "../login/login.service";
import {inject} from "@angular/core";


export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  // return true;
  if (loginService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['login']).then();
    return false;
  }
};
