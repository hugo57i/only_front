import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierRoutingModule } from './panier-routing.module';
import { NotifierModule, NotifierOptions } from "angular-notifier";

import { PanierComponent } from '../../../panier/panier.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: "left",
      distance: 12
    },
    vertical: {
      position: "top",
      distance: 12,
      gap: 10
    }
  }
};

@NgModule({
  declarations: [
    PanierComponent
  ],
  imports: [
    CommonModule,
    PanierRoutingModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  exports: [
    PanierComponent
  ]
})
export class PanierModule { }
