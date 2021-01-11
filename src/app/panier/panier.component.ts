import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Produit } from '../produit';
import { Store } from '@ngxs/store';
import { ProductState } from '../states/product-state';
import { DelProduct } from '../actions/product-action';
import { NotifierService } from "angular-notifier";
import { ProductService } from '../product.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit, OnDestroy {

  listProducts$: Observable<Produit>;
  nbProducts$: number;
  total$: number = 0;

  private nbProductsSub: Subscription;
  private totalSub: Subscription;
  private sendDatas: Subscription;
  private responseSub: Subscription;
  constructor(private store: Store, 
    public notifierService: NotifierService,
    public productService: ProductService) { }

  ngOnInit() {
    this.listProducts$ = this.store.select(state => state.listProducts.products);
    this.nbProductsSub = this.store.select(ProductState.getNbProducts).subscribe(
      (products: number) => {
          this.nbProducts$ = products;
      }
     );
    this.totalSub = this.store.select(ProductState.getTotalPrices).subscribe(
    (price: number) => {
        this.total$ = price;
    }
    );
  }

  ngOnDestroy() {
    if(this.totalSub){
      this.totalSub.unsubscribe();
    }
    if(this.nbProductsSub){
      this.nbProductsSub.unsubscribe();
    }
    if(this.sendDatas){
      this.sendDatas.unsubscribe();
    }
    if(this.responseSub){
      this.responseSub.unsubscribe();
    }
  }

  public onDelFromCart(product: {id: number, nom: string, prix: number, type: string, categorie: string, pathImg: string, description: string}): void {
    this.delProduct(product.id, product.nom, product.prix, product.type, product.categorie, product.pathImg, product.description);
  }

  private delProduct(id: number, nom: string, prix: number, type: string, categorie: string, pathImg: string, description: string): void {
    const quantite = 1;
    this.store.dispatch(new DelProduct({ id, nom, prix, type, categorie, pathImg, quantite, description}));
  }

  public proceedPayment(): void {
    
    if(localStorage.getItem('connected') === null || localStorage.getItem('connected') !== 'true') {
      this.notifierService.notify("error", "Veuillez vous connecter pour confirmer la commande !");
    }
    else {
      let productsIdsArray = [];
      this.sendDatas = this.store.select(state => state.listProducts.products).subscribe((products: []) => {
        products.map((product : Produit) => {
          productsIdsArray.push({id : product.id, quantite : product.quantite});
        });
        let data = {productsIds: productsIdsArray};
        this.responseSub = this.productService.validateProduct(data).subscribe( data => {
          if(data.body.success) {
            this.notifierService.notify("success", "Votre commande n°" + data.body.order + " a bien été passé !");
          }
          else {
            this.notifierService.notify("error", "Il y a eu une erreur avec votre commande. Veuillez réessayer.");
          }
          this.sendDatas.unsubscribe();
          this.responseSub.unsubscribe();
        });
      });
    }
}

}
