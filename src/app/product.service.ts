import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produit } from './produit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products: [];
  constructor(private http: HttpClient) {
   }

  getAllProducts(): Observable<any> {
      return this.http.get("https://projetzigbackbdd.herokuapp.com/catalogue");
  }

  getOneProduct(id: number): Produit {
    return this.products[id-1];
  }

  public getProducts(): [] {
    return this.products;
  }

  public setProducts(productsArray : []): void {
    this.products = productsArray;
  }

  validateProduct(data : {productsIds: Object[]}): Observable<any> {
    let body = new URLSearchParams();
    body.set('login', localStorage.getItem("login"));
    body.set('products', JSON.stringify(data));
    return this.http.post<Object>("https://projetzigbackbdd.herokuapp.com/validateOrder", body.toString(), { headers: 
    { 'content-type': 'application/x-www-form-urlencoded', 'Authorization' : 'Bearer ' + localStorage.getItem("token") }, 
    observe: 'response' });
  }

}
