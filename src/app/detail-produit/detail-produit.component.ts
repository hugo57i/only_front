import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from '../product.service';
import { Produit } from '../produit';
import { Store } from '@ngxs/store';
import { AddProduct } from '../actions/product-action';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {

  public product: Produit = {
    id: 0,
    nom: '', prix: 0,
    type: '',
    categorie: '',
    pathImg: '',
    quantite: 0,
    description: ''};

  constructor(private route: ActivatedRoute, public productService: ProductService, private store: Store) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.product = this.productService.getOneProduct(id);
  }

  public onAddToCart(): void {
    this.addProduct(this.product.id, this.product.nom, this.product.prix, this.product.type,
      this.product.categorie, this.product.pathImg, this.product.description);
  }

  private addProduct(id: number, nom: string, prix: number, type: string, categorie: string, pathImg: string, description: string): void {
    const quantite = 1;
    this.store.dispatch(new AddProduct({ id, nom, prix, type, categorie, pathImg, quantite, description }));
  }

}
