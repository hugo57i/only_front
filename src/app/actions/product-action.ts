import { Produit } from '../produit';

export class AddProduct {
  static readonly type = '[Produit] Add';
  constructor(public payload: Produit) {}
}
export class DelProduct{
  static readonly type = '[Produit] Del';
  constructor(public payload: Produit) {}
}
