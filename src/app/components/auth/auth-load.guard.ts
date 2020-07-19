import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable, timer, of } from "rxjs";

import { AuthService } from "./auth.service";
import { mapTo, tap } from 'rxjs/operators';

@Injectable()
export class AuthLoadGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return of(this.authService.getIsAuth()).pipe(
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/']);
        }
      })
    );

  }
}
