import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MicuentaPageRoutingModule } from './micuenta-routing.module';

import { MicuentaPage } from './micuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MicuentaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MicuentaPage]
})
export class MicuentaPageModule {}
