/* eslint-disable eqeqeq */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Producto } from '../modelos/producto';
import { ToastController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
// eslint-disable-next-line max-len
const httpOptions = {
  headers: new HttpHeaders({
    'content-type':'application/json',
    // eslint-disable-next-line quote-props
    'Authorization':'Bearer' + localStorage.getItem('token')
  }),
};
@Injectable()
export class ProductosService {
public cart = [];

public cartItemCount = new BehaviorSubject(0);
// private headers = {'content-type':'application/json'};
// private headers = {'content-type':'application/json'};
constructor(private http: HttpClient, public toastController: ToastController) { }

getProductos(): Observable<Response> {
  return this.http.get<Response>("https://wsproyecto.somee.com/api/Producto/",httpOptions).
  pipe(catchError(this.handleError));;
}
getCategorias(): Observable<Response> {
  return this.http.get<Response>("https://wsproyecto.somee.com/api/Categoria/",httpOptions).
  pipe(catchError(this.handleError));;
}
getCart() {
  return this.cart;
}

getCartItemCount() {
  return this.cartItemCount;
}
  async addProduct(product) {
  let added = false;
  for (const p of this.cart) {
    if (p.Id === product.Id) {
      if(p.amount < product.Stock){
        p.amount += 1;
        p.subtotal = p.amount * p.Precio;
        added = true;
        this.cartItemCount.next(this.cartItemCount.value + 1);
        console.log(this.cart);
        break;
      }else{
        const toast = await this.toastController.create({
          message: 'Stock maximo disponible ' + product.Stock+ ' !',
          duration: 2000
        });
        toast.present();
        added = true;
        break;
      }

    }
  }
  if (!added) {
    product.amount = 1;
    product.subtotal = product.amount * product.Precio;
    this.cart.push(product);
    this.cartItemCount.next(this.cartItemCount.value + 1);
    console.log(this.cart);

  }
}

decreaseProduct(product) {
  for (const [index, p] of this.cart.entries()) {
    if (p.Id === product.Id) {

      p.amount -= 1;
      const newSubtotal= p.Precio * p.amount;
      p.subtotal = newSubtotal  ;
      this.cartItemCount.next(this.cartItemCount.value - 1);
      if (p.amount == 0) {
        this.cart.splice(index, 1);
      }
    }
  }

  console.log(this.cart);
}


removeProduct(product) {
  for (const [index, p] of this.cart.entries()) {
    if (p.Id === product.Id) {
      this.cartItemCount.next(this.cartItemCount.value - p.amount);
      this.cart.splice(index, 1);
    }
  }
}

  ////////////////////// ERRORES //////////////////////

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
