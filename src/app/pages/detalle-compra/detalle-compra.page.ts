import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleCompra } from 'src/app/modelos/detalle-compra';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.page.html',
  styleUrls: ['./detalle-compra.page.scss'],
})
export class DetalleCompraPage implements OnInit {
 compra:any;
  detalleCompra: DetalleCompra[];
  post: any;
  constructor(private route: ActivatedRoute,
    private router: Router) {
    // this.detalleCompra = [];
    // this.post = JSON.parse( this.activatedRoute.snapshot.paramMap.get('post') );
    // console.log(this.post);
    this.route.queryParams.subscribe(_p => {
      const navParams = this.router.getCurrentNavigation().extras.state;
      if (navParams){
        this.compra = navParams.compra;
        console.log(this.compra);
      }
    });
   }

  ngOnInit() {
  }

}
