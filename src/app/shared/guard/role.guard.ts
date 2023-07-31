import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // const isAuthorized = this.authService.user?.data?.role.includes(
    //   ['SUPER_ADMIN','ADMIN']
    // );
    const roles = route.data['role'];
    
    // route.data['role'] = ['SUPER_ADMIN','ADMIN']
    // const isAuthorized = this.authService.user?.data?.role.includes(route.data['role'])
    // const isAuthorized = this.authService.user?.data?.role?.some((role:string) => route.data['role'].includes(role));
    const isAuthorized = Array.isArray(this.authService.user?.Role) ? this.authService.user?.Role.some((role:any) => roles.includes(role)) : roles.includes(this.authService.user?.Role);
    
    if(!isAuthorized){
      return this.router.createUrlTree(['/error/404']);
    }else{
    return true;
    }
  }
}
