import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { Produit } from '../produit';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

  public minValue = 0;
  public maxValue = 500;
  public options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Prix min.:</b> €' + value;
        case LabelType.High:
          return '<b>Prix max.:</b> €' + value;
        default:
          return value + '€';
      }
    }
  };
  public typeSelected: string = "Aucune";
  public categorieSelected: string = "Aucune";
  public searchFilter: string = "";
  public showedProducts;

  @Output() showedProductsEvent = new EventEmitter();
  @Input() products: [] = [];
  @Input() categories: string[] = [];
  @Input() types: string[] = [];
  constructor() { }

  ngOnInit() {
  }

  public onCategoryChanged(event): void {
    this.categorieSelected = event.target.value;
    if (event.target.value === 'Aucune') {
       if (this.typeSelected === 'Aucune') {
        this.showedProducts = this.products;
      } else {
        this.showedProducts = this.products.filter((product: Produit) => {
          return product.type === this.typeSelected;
        });
      }
    } else {
      if (this.typeSelected === 'Aucune') {
        this.showedProducts = this.products.filter((product: Produit) => {
          return product.categorie === event.target.value;
        });
      } else {
        this.showedProducts = this.products.filter((product: Produit) => {
          return product.categorie === event.target.value && product.type === this.typeSelected;
        });
      }
    }
    this.showedProducts = this.showedProducts.filter((product: Produit) => {
      if (this.searchFilter === '') {
        return this.minValue <= product.prix && product.prix <= this.maxValue;
      } else {
        return product.nom.toLowerCase().indexOf(this.searchFilter.toLowerCase()) !== -1 &&
        this.minValue <= product.prix && product.prix <= this.maxValue;
      }
    });
    this.showedProductsEvent.emit(this.showedProducts);
  }

  public onTypeChanged(event): void {
    this.typeSelected = event.target.value;
    if (event.target.value === 'Aucune') {
       if (this.categorieSelected === 'Aucune') {
        this.showedProducts = this.products;
      } else {
        this.showedProducts = this.products.filter((product: Produit) => {
          return product.categorie === this.categorieSelected;
        });
      }
    } else {
      if (this.categorieSelected === 'Aucune') {
        this.showedProducts = this.products.filter((product: Produit) => {
          return product.type === event.target.value;
        });
      } else {
        this.showedProducts = this.products.filter((product: Produit) => {
          return product.type === event.target.value && product.categorie === this.categorieSelected;
        });
      }
    }
    this.showedProducts = this.showedProducts.filter((product: Produit) => {
      if (this.searchFilter === '') {
        return this.minValue <= product.prix && product.prix <= this.maxValue;
      } else {
        return product.nom.toLowerCase().indexOf(this.searchFilter.toLowerCase()) !== -1 &&
        this.minValue <= product.prix && product.prix <= this.maxValue;
      }
    });
    this.showedProductsEvent.emit(this.showedProducts);
  }

  public priceChange(): void {
    this.showedProducts = this.products.filter((product: Produit) => {
      return this.minValue <= product.prix && product.prix <= this.maxValue;
    });
    if (this.typeSelected !== 'Aucune') {
      this.showedProducts = this.showedProducts.filter((product: Produit) => {
        return product.type === this.typeSelected;
      });
    }
    if (this.categorieSelected !== 'Aucune') {
      this.showedProducts = this.showedProducts.filter((product: Produit) => {
        return product.categorie === this.categorieSelected;
      });
    }
    this.showedProducts = this.showedProducts.filter((product: Produit) => {
      if (this.searchFilter === '') {
        return product;
      } else {
        return product.nom.toLowerCase().indexOf(this.searchFilter.toLowerCase()) !== -1;
      }
    });
    this.showedProductsEvent.emit(this.showedProducts);
  }

  public searchByName(event): void {
    this.searchFilter = event;
    this.showedProducts = this.products.filter((product: Produit) => {
      if (event === '') {
        return product;
      } else {
        return product.nom.toLowerCase().indexOf(event.toLowerCase()) !== -1;
      }
    });
    if (this.typeSelected !== 'Aucune') {
      this.showedProducts = this.showedProducts.filter((product: Produit) => {
        return product.type === this.typeSelected;
      });
    }
    if (this.categorieSelected !== 'Aucune') {
      this.showedProducts = this.showedProducts.filter((product: Produit) => {
        return product.categorie === this.categorieSelected;
      });
    }
    this.showedProducts = this.showedProducts.filter((product: Produit) => {
      return this.minValue <= product.prix && product.prix <= this.maxValue;
   });
    this.showedProductsEvent.emit(this.showedProducts);
  }

}
