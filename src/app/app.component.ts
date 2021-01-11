import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'TP02';
    public productSubscribe: Subscription;
    constructor(public productService: ProductService, private router: Router) {
    }

    ngOnInit() {
      this.router.navigate(['home']);
      this.productSubscribe = this.productService.getAllProducts().subscribe((data) => {   
        this.productService.setProducts(data);
      });
    }

    ngOnDestroy() {
      if(this.productSubscribe) {
        this.productSubscribe.unsubscribe();
      }
    }

}
