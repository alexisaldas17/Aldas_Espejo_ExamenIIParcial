import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigToken } from "@ionic/angular/providers/config";
import { Observable } from "rxjs";
import { AuthService } from "../servicios/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
  /**
   *
   */
  constructor(private apiAuth:AuthService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //const usuario = this.apiAuth.UsuarioData;
    const token = localStorage.getItem('token');

    if(token){
      request = request.clone({
        setHeaders:{
           Authorization: `Bearer ${token}`
                  }
      });
    }
    return next.handle(request);
  }
}
