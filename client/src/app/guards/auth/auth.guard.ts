import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ){}

  canActivate(): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    const token = this.storageService.getProperty(environment.TOKEN_KEY);
    if (token) {
      const jwtHelper = new JwtHelperService();
      if (jwtHelper.isTokenExpired(token)) {
        this.authService.logout();
        return this.router.createUrlTree(['/login']);
      } else {
        return true;
      }
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}
