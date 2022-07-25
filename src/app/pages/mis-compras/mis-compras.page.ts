import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Errores } from 'src/app/Entidades/MensajeError';
import { Compra } from 'src/app/modelos/compra';
import { DetalleCompra } from 'src/app/modelos/detalle-compra';
import { AuthService } from 'src/app/servicios/auth.service';
import { CompraService } from 'src/app/servicios/compra.service';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.page.html',
  styleUrls: ['./mis-compras.page.scss'],
})
export class MisComprasPage implements OnInit {
  public compra: any;
  compraCliente: any[];
  constructor(
    private compraService: CompraService,
    private loadingController: LoadingController,
    private router: Router,
    private authService: AuthService,
    private nav: NavController
  ) {
    this.compra = [];
    this.compraCliente = [];
    this.obtenerDatos();
    console.log(this.compraCliente);
  }
  ngOnInit() {}

  enviarDatos(compra: Compra) {
    //     this.router.navigate(['/detalle-compra', {
    //       post: JSON.stringify(compra)
    // }]);
    this.nav.navigateForward('detalle-compra/${compra.Id}', {
      state: { compra },
    });
  }

  async obtenerDatos(){
    const cedula = localStorage.getItem('id');
    const loading = await this.loadingController.create();
    await loading.present();
    this.compraService.getComprasCliente(cedula).subscribe(async data => {
      this.compra = data;
      this.compra.forEach( element => {
        this.compraCliente.push(element);

      });
       await loading.dismiss();
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
 });
 await loading.dismiss();
  }
}
