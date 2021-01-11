import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompteClientRoutingModule } from './compte-client-routing.module';
import { NotifierModule, NotifierOptions } from "angular-notifier";

import { SaisieClientComponent } from '../../../saisie-client/saisie-client.component';
import { RecapitulatifDonneeComponent } from '../../../recapitulatif-donnee/recapitulatif-donnee.component';
import { PhonepipePipe } from '../../../phonepipe.pipe';

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
    SaisieClientComponent,
    RecapitulatifDonneeComponent,
    PhonepipePipe
  ],
  imports: [
    CommonModule,
    CompteClientRoutingModule,
    FormsModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  exports: [
    SaisieClientComponent
  ]
})
export class CompteClientModule { }
