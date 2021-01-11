import { Component, OnInit, Input } from '@angular/core';
import { AddProduct } from '../actions/product-action';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Produit } from '../produit';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() product: Produit;
  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
  }

  public onAddToCart(): void {
    this.addProduct(this.product.id, this.product.nom, this.product.prix, this.product.type,
      this.product.categorie, this.product.pathImg, this.product.description);
  }

  private addProduct(id: number, nom: string, prix: number, type: string, categorie: string, pathImg: string, description: string): void {
    const quantite = 1;
    this.store.dispatch(new AddProduct({ id, nom, prix, type, categorie, pathImg, quantite, description }));
  }

  public onDetailsRequest(): void {
    this.router.navigate(['/catalogue', 'product', this.product.id]);
  }

}
