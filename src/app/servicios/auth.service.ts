import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { User } from '../modelos/user';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Registro } from '../modelos/registro';
const JWT_KEY = 'myjwtstoragekey';
const httpOptions = {
  headers: new HttpHeaders({
    'content-type':'application/json'
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  // isAuthenticated = new BehaviorSubject(
  //   null
  // );


  // eslint-disable-next-line @typescript-eslint/member-ordering
  authChange = new Subject<boolean>();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private http: HttpClient,
    private plt: Platform,
    private router: Router,
  ) {

  }


  login(credentials): Observable<any> {
   const body =JSON.stringify(credentials);
    return this.http.post('https://wsproyecto.somee.com/api/LoginCliente/Login', body, httpOptions).pipe(
      map(res=>{
        if(res!=null){
          console.log(res);
          const user: any = res;
          localStorage.setItem('Usuario', JSON.stringify(user));
          localStorage.setItem('token', user.Token);
          localStorage.setItem('id', user.Cedula);
         // this.authChange.next(true);
          //this.isAuthenticated.next(user);
       return res;
        }

      }),
           //catchError((this.handleError))

    );
  }
  logoutAviso(): void{
    alert("Debe logearse nuevamente");
    this.logout();
  }
  registrarUsuario(registro: Registro): Observable<any>{
    const res= JSON.stringify(registro);
    console.log(res);
    return this.http.post('https://wsproyecto.somee.com/api/LoginCliente/Registro', res, httpOptions);
  }
  logout() {
    localStorage.removeItem('Usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
   //this.isAuthenticated.next(null);
  }
}
