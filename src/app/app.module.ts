import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { ProductosService } from './servicios/productos.service';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { AuthService } from './servicios/auth.service';
import { JwtInterceptor } from './guards/jwt.interceptor';
import { LoginPageModule } from './usuario/login/login.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { LoggedinGuard } from './guards/loggedin.guard';
import { ClienteService } from './servicios/cliente.service';
import { MicuentaPage } from './pages/micuenta/micuenta.page';
import { CompraService } from './servicios/compra.service';
import { ProductosPage } from './pages/productos/productos.page';
import { ProductosPageModule } from './pages/productos/productos.module';


@NgModule({
  declarations: [	AppComponent,
       MenuComponent,

   ],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,Ng2SearchPipeModule, LoginPageModule,
       ReactiveFormsModule,ProductosPageModule
               ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    ProductosService, AuthService, AuthGuard, LoggedinGuard,ClienteService,
    CompraService
  ],
  bootstrap: [AppComponent],
  exports: [MenuComponent, ]
})
export class AppModule {}
