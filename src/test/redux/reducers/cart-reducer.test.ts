import {createStore} from "redux";
import rootReducer from "../../../redux/reducers/root-reducer";
import cartReducer, {InitialStateType} from "../../../redux/reducers/cart-reducer";
import {
    calculateCartPriceSuccess,
    clearCartSuccess,
    fetchCartSuccess,
    loadingCart,
    stopLoadingCart
} from "../../../redux/actions/cart-actions";
import {Product} from "../../../types/types";
import {productsData} from "../../test-data/product-test-data";

let store = createStore(rootReducer);
let products: Array<Product>;
let cartPrice: number;

beforeEach(() => {
    products = productsData;
    cartPrice = 123;
});

test("Loading Cart", () => {
    const state: InitialStateType = cartReducer(store.getState().cart, loadingCart());
    expect(state.loading).toBeTruthy();
});

test("Stop Loading Cart", () => {
    const state: InitialStateType = cartReducer(store.getState().cart, stopLoadingCart());
    expect(state.loading).toBeFalsy();
    expect(state.products).toEqual([]);
});

test("Clear Cart", () => {
    const state: InitialStateType = cartReducer(store.getState().cart, clearCartSuccess());
    expect(state.products).toEqual([]);
});

test("Fetch Cart", () => {
    const state: InitialStateType = cartReducer(store.getState().cart, fetchCartSuccess(products));
    expect(state.products).toEqual(products);
    expect(state.loading).toBeFalsy();
});

test("Calculate Cart Price", () => {
    const state: InitialStateType = cartReducer(store.getState().cart, calculateCartPriceSuccess(cartPrice));
    expect(state.totalPrice).toEqual(cartPrice);
    expect(state.loading).toBeFalsy();
});
