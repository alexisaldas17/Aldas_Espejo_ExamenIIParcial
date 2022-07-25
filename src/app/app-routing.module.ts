import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedinGuard } from './guards/loggedin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
{
  path: 'home'
  ,    canActivate: [AuthGuard],
  loadChildren: () => import('./home/home.module').then(m=> m.HomePageModule)
},

  {
    path: 'productos',

    loadChildren: () => import('./pages/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'micuenta',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/micuenta/micuenta.module').then( m => m.MicuentaPageModule)
  },
  {
    path: 'cartamodal',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/cartamodal/cartamodal.module').then( m => m.CartamodalPageModule)
  },
  {
    path: 'login',
    canActivate: [LoggedinGuard],
       loadChildren: () => import('./usuario/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./usuario/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'mis-compras',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/mis-compras/mis-compras.module').then( m => m.MisComprasPageModule)
  },
  {
    path: 'detalle-compra/:id',
    loadChildren: () => import('./pages/detalle-compra/detalle-compra.module').then( m => m.DetalleCompraPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
