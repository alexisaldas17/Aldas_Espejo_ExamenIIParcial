import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Compra } from '../modelos/compra';
// eslint-disable-next-line max-len
const httpOptions = {
  headers: new HttpHeaders({
    'content-type':'application/json',
    // eslint-disable-next-line quote-props
    'Authorization':'Bearer' + localStorage.getItem('token')
  }),
};
@Injectable({
  providedIn: 'root'
})
export class CompraService {
constructor(private http: HttpClient, public toastController: ToastController) { }
guardarCompra(compra: Compra) {
  return this.http.post("https://wsproyecto.somee.com/api/Factura",compra ,httpOptions).
  pipe(catchError(this.handleError));;
}
getComprasCliente(cedula: string): Observable<Response> {
  return this.http.get<Response>("https://wsproyecto.somee.com/api/Factura/"+cedula,httpOptions).
  pipe(catchError(this.handleError));;
}
handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  return throwError(error);
}
}
