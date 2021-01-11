import { NgxsModule, Action, Selector, State, StateContext } from '@ngxs/store';
import { ProductStateModel } from './product-state-model';
import { AddProduct, DelProduct } from '../actions/product-action';

@State<ProductStateModel>({
  name: 'listProducts',
  defaults: {
    products: []
  }
})
export class ProductState {
  @Selector()
  static getNbProducts(state: ProductStateModel): number {
    let nbProducts: number = 0;
    state.products.map((product) => nbProducts += product.quantite);
    return nbProducts;
  }

  @Selector()
  static getTotalPrices(state: ProductStateModel): number {
    let total: number = 0;
    state.products.map((product) => total += product.prix * product.quantite);
    return total;
  }

  @Action(AddProduct)
  add(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: AddProduct
  ) {
    const state = getState();
    patchState({
      products: state.products.find(x => x.id === payload.id) ?
                    state.products.map((product) => {
                        let temp = Object.assign({}, product);
                        if (temp.id === payload.id) {
                            temp.quantite++;
                        }
                        return temp;
                    }) : [...state.products, payload]
    });
  }

  @Action(DelProduct)
  del(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: DelProduct
  ) {
    const state = getState();
    patchState({
      products:  state.products.find(x => x.id === payload.id).quantite > 1 ?
        state.products.map((product) => {
            let temp = Object.assign({}, product);
            if (temp.id === payload.id) {
                temp.quantite--;
            }
            return temp;
        }) : state.products.filter(item => item.nom !== payload.nom && item.id !== payload.id)
    });
  }
}
