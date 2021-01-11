import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailProduitRoutingModule } from './detail-produit-routing.module';

import { DetailProduitComponent } from '../../../detail-produit/detail-produit.component';


@NgModule({
  declarations: [
    DetailProduitComponent
  ],
  imports: [
    CommonModule,
    DetailProduitRoutingModule
  ],
  exports: [
    DetailProduitComponent
  ]
})
export class DetailProduitModule { }
