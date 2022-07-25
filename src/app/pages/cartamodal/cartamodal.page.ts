import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Errores } from 'src/app/Entidades/MensajeError';
import { Compra } from 'src/app/modelos/compra';
import { DetalleCompra } from 'src/app/modelos/detalle-compra';
import { Producto } from 'src/app/modelos/producto';
import { AuthService } from 'src/app/servicios/auth.service';
import { CompraService } from 'src/app/servicios/compra.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { ProductosPage } from '../productos/productos.page';

@Component({
  selector: 'app-cartamodal',
  templateUrl: './cartamodal.page.html',
  styleUrls: ['./cartamodal.page.scss'],
})
export class CartamodalPage implements OnInit {
   iva: number;
  total: number;
  subtotal: number;
  cart: any[] = [];
  compra: Compra;
  detalleCompra: DetalleCompra[];
  constructor(
    private cartService: ProductosService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private compraService:CompraService,
    private authService:AuthService,
    public toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router,
   // private productosC: ProductosPage
  ) {

    this.detalleCompra = [];
    this.compra = {
      idCliente: '',
      total: 0,
      iva: 0,
      fecha: new Date(),
      subtotal: 0,
      detallesFactura: this.detalleCompra,
    };
  }

  ngOnInit() {

    this.cart = this.cartService.getCart();
    this.getTotal();
    console.log(this.cart);
  }

  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
    this.getTotal();
  }

  increaseCartItem(product) {
    this.cartService.addProduct(product);
    this.getTotal();
  }

  removeCartItem(product) {
    this.cartService.removeProduct(product);
    this.getTotal();
  }

  getTotal() {
    this.subtotal= 0;
    this.subtotal = this.cart.reduce((i, j) => i + j.Precio * j.amount, 0);
    this.iva = this.round( this.subtotal * 0.12);

    this.total= this.round(this.subtotal +  this.iva);
    // this.calcularIva();
    //  this.total = this.subtotal + this.iva;
    // return this.total;
  }

  round(num) {
    const m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }
  // getSubTotal() {

  //    this.subtotal = this.cart.reduce((i, j) => i + j.Precio * j.amount, 0);
  //    this.getTotal();
  // }
  // calcularIva() {
  //   this.iva = Number(this.subtotal * 0.12);
  // }
  close() {
    this.modalCtrl.dismiss();
  }

  async checkout() {
    // Perfom PayPal or Stripe checkout process
    this.mapearCompra();
    const loading = await this.loadingController.create();
    await loading.present();
    this.compraService.guardarCompra(this.compra).subscribe(
      async (res) => {
        console.log(res);
        if(res>0){
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Compra realizada con satisfacción! ',
            duration: 2000
          });
          toast.present();
          this.reset();
          this.close();
          this.router.navigate(['/mis-compras']);
        }
      },
      (error: HttpErrorResponse) => {
        // eslint-disable-next-line eqeqeq
        if (error.status == 0) {
          this.authService.logoutAviso();
           loading.dismiss();
        } else {
          alert(Errores.mostrar(error.status));
           loading.dismiss();
        }
      }
    );
    // const alert = await this.alertCtrl.create({
    //   header: 'Gracias por tu compra!',
    //   message: 'Entregaremos tu pedido lo mas pronto posible',
    //   buttons: ['OK'],
    // });
    // alert.present().then(() => {
    //   this.modalCtrl.dismiss();
    // });
  }

  reset(){
    this.cart = [];
    this.cartService.cartItemCount.next(0);
    this.cartService.cart = [];
    this.compra = null;
    this.detalleCompra = [];
    this.iva = 0;
    this.total = 0;
    this.subtotal = 0;
   // this.productosC.cartItemCount = new BehaviorSubject(0);

  }
  mapearCompra() {
    this.cart.forEach((e) => {
      this.detalleCompra.push({
        idProducto: e.Id,
        cantidad: e.amount,
        subtotal: e.subtotal,
      });
    });
    this.compra.detallesFactura = this.detalleCompra;
    this.compra.total = this.total;
    this.compra.iva = this.iva;
    this.compra.idCliente = localStorage.getItem('id');
    this.compra.subtotal = this.subtotal;
    console.log(this.compra);
  }
}
