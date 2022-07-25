import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    //console.log(this.authService.isAuthenticated);
    const token = localStorage.getItem('token');
    if (token) {
        this.router.navigate(['/home']);
        return false;
    } else {
        return true;
    }
}

}
