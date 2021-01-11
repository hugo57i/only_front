import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaisieClientComponent } from '../../../saisie-client/saisie-client.component';


const routes: Routes = [
  { path: '', component: SaisieClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompteClientRoutingModule { }
