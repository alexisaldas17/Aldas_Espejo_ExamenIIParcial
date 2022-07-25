import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartamodalPageRoutingModule } from './cartamodal-routing.module';

import { CartamodalPage } from './cartamodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartamodalPageRoutingModule
  ],
  declarations: [CartamodalPage]
})
export class CartamodalPageModule {}
