import rootReducer from "../../../redux/reducers/root-reducer";
import {createStore} from "redux";
import productReducer, {InitialStateType} from "../../../redux/reducers/product-reducer";
import {Product} from "../../../types/types";
import {
    fetchProductByQuerySuccess,
    fetchProductsByFilterParamsSuccess,
    fetchProductsByGenderSuccess,
    fetchProductsByProductrSuccess,
    fetchProductsByQuerySuccess,
    fetchProductSuccess,
    getProducts,
    loadingProduct
} from "../../../redux/actions/product-actions";
import {productData, productsData} from "../../test-data/product-test-data";

let store = createStore(rootReducer);
let product: Product;
let products: Array<Product>;

beforeEach(() => {
    product = productData;
    products = productsData;
});

test("Loading Product", () => {
    const state: InitialStateType = productReducer(store.getState().product, loadingProduct());
    expect(state.isProductLoading).toBeTruthy();
});

test("Fetch Product", () => {
    const state: InitialStateType = productReducer(store.getState().product, fetchProductSuccess(product));
    expect(state.product).toEqual(product);
    expect(state.isProductLoading).toBeFalsy();
    expect(state.reviews.length).toEqual(3);
});

test("Fetch Product By Query", () => {
    const state: InitialStateType = productReducer(store.getState().product, fetchProductByQuerySuccess(product));
    expect(state.product).toEqual(product);
    expect(state.isProductLoading).toBeFalsy();
    expect(state.reviews.length).toEqual(3);
});

test("Fetch Products", () => {
    const state: InitialStateType = productReducer(store.getState().product, getProducts(products));
    expect(state.products.length).toEqual(3);
    expect(state.products[0]).toEqual(product);
    expect(state.isProductLoading).toBeFalsy();
});

test("Fetch Products By Query", () => {
    const state: InitialStateType = productReducer(store.getState().product, fetchProductsByQuerySuccess(products));
    expect(state.products.length).toEqual(3);
    expect(state.isProductLoading).toBeFalsy();
});

test("Fetch Products By Gender", () => {
    const state: InitialStateType = productReducer(store.getState().product, fetchProductsByGenderSuccess(products));
    expect(state.products.length).toEqual(3);
    expect(state.isProductLoading).toBeFalsy();
});

test("Fetch Products By Productr", () => {
    const state: InitialStateType = productReducer(store.getState().product, fetchProductsByProductrSuccess(products));
    expect(state.products.length).toEqual(3);
    expect(state.isProductLoading).toBeFalsy();
});

test("Fetch Products By Filter Params", () => {
    const state: InitialStateType = productReducer(store.getState().product, fetchProductsByFilterParamsSuccess(products));
    expect(state.products.length).toEqual(3);
    expect(state.isProductLoading).toBeFalsy();
});
