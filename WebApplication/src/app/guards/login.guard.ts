import {CanActivateFn, Router} from '@angular/router';
import {LoginService} from "../login/login.service";
import {inject} from "@angular/core";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";


export const loginGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const token = localStorage.getItem('jwtToken');

  if (!token) {
    router.navigate(['login']).then();
    return false;
  }

  return loginService.isTokenValid(token).pipe(
    map((isValid: boolean) => {
      if (isValid) {
        return true;
      } else {
        alert('Nie prawidłowy token logowania!');
        router.navigate(['login']).then();
        return false;
      }
    }),
    catchError(() => {
      alert('Nie prawidłowy token logowania!');
      router.navigate(['login']).then();
      return of(false);
    })
  );
};
