import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ProductState } from '../states/product-state';

@Component({
  selector: 'app-tetiere',
  templateUrl: './tetiere.component.html',
  styleUrls: ['./tetiere.component.css']
})
export class TetiereComponent implements OnInit {

  nbProducts$: Observable<number>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.nbProducts$ = this.store.select(ProductState.getNbProducts);
  }

}
