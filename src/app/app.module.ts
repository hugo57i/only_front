// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompteClientModule } from './modules/general/compte-client/compte-client.module';
import { CatalogueModule } from './modules/general/catalogue/catalogue.module';
import { DetailProduitModule } from './modules/general/detail-produit/detail-produit.module';
import { PanierModule } from './modules/general/panier/panier.module';

// Components
import { AppComponent } from './app.component';
import { TetiereComponent } from './tetiere/tetiere.component';
import { FooterComponent } from './footer/footer.component';
import { AcceuilComponent } from './acceuil/acceuil.component';

// Services
import { ProductService } from './product.service';

// States
import { ProductState } from './states/product-state';
import { ConnexionComponent } from './connexion/connexion.component';


const appRoutes: Routes = [
  { path: 'home', component: AcceuilComponent },
  { path: 'createAccount', loadChildren: () => import('./modules/general/compte-client/compte-client.module')
  .then(mod => mod.CompteClientModule) },
  { path: 'catalogue', loadChildren: () => import('./modules/general/catalogue/catalogue.module')
  .then(mod => mod.CatalogueModule)  },
  { path: 'cart', loadChildren: () => import('./modules/general/panier/panier.module')
  .then(mod => mod.PanierModule)  },
  { path: 'catalogue/product/:id', loadChildren: () => import('./modules/general/detail-produit/detail-produit.module')
  .then(mod => mod.DetailProduitModule)},
  {path: 'login', component: ConnexionComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    TetiereComponent,
    FooterComponent,
    AcceuilComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([
      ProductState
    ]),
    CompteClientModule,
    CatalogueModule,
    DetailProduitModule,
    PanierModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
