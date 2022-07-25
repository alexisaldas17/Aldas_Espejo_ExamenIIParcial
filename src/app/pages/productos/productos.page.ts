import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Errores } from 'src/app/Entidades/MensajeError';
import { Producto } from 'src/app/modelos/producto';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { CartamodalPage } from '../cartamodal/cartamodal.page';
import { MicuentaPage } from '../micuenta/micuenta.page';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  cartItemCount: BehaviorSubject<number>;
listaProductos$:any;
cart = [];
categorias: any;
searchTerm: string;
  constructor(private productosService: ProductosService,
    private loadingController: LoadingController,
    private modalCtrl: ModalController,
    private authService:AuthService) {
      this.productosService.getCategorias().subscribe(res=>{
        this.categorias = res;
      },
      (error: HttpErrorResponse) => {
        // eslint-disable-next-line eqeqeq
        if(error.status==0){
          this.authService.logoutAviso();
        }else{
          alert(Errores.mostrar(error.status));
        }
      });

     }

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.listaProductos$ = [];
    this.productosService.getProductos().subscribe(
       async (response) => {
        await loading.dismiss();
        this.listaProductos$ = response;
        this.newlistaProductos = response;
        },
        (error:HttpErrorResponse)=>{

          console.log(error.status);
              // eslint-disable-next-line eqeqeq
          if(error.status==0){
            this.authService.logoutAviso();
              loading.dismiss();
          }else{
            alert(Errores.mostrar(error.status));
             loading.dismiss();
          }
        }

    );
    this.cart = this.productosService.getCart();
    this.cartItemCount = this.productosService.getCartItemCount();
    console.log(this.cartItemCount);
  }

  addToCart(product) {
    this.productosService.addProduct(product);
    this.animateCSS('tada');
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName);
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd);
    }
    node.addEventListener('animationend', handleAnimationEnd);
  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);

    const modal = await this.modalCtrl.create({
      component: CartamodalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  productosCategoria: Array<any>=[];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  newlistaProductos: any;

  categoriaSeleccionada(event: any){
    this.searchTerm = '';
    console.log(event.target.value);
    this.listaProductos$= this.newlistaProductos;
    //this.productosCategoria=[];
    this.productosCategoria = this.listaProductos$.filter(
      // eslint-disable-next-line arrow-body-style
      (producto) => {
        // eslint-disable-next-line eqeqeq
        return producto.IdCategoria===event.target.value;

      }
      //this.ciudadesPorProvincia.push(producto)
      );

        this.listaProductos$ = this.productosCategoria;
      // eslint-disable-next-line eqeqeq
      if(event.target.value == -1){
        this.listaProductos$= this.newlistaProductos;
      }
      console.log(this.productosCategoria);
  }
}
