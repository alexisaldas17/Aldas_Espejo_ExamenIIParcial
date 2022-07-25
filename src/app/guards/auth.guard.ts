import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private alertCtrl: AlertController
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    //const usuario= this.auth.UsuarioData;
    const token = localStorage.getItem('token');
    if(token){
      return true;
    }
   this.router.navigate(["/login"]);
    return false;
  }
}
