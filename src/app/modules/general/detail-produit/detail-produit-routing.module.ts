import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailProduitComponent } from '../../../detail-produit/detail-produit.component';


const routes: Routes = [
  { path: '', component: DetailProduitComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailProduitRoutingModule { }
