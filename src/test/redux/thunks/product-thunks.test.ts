import {AnyAction} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {productData, productsData} from "../../test-data/product-test-data";
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
import {
    fetchProduct,
    fetchProductByQuery,
    fetchProducts,
    fetchProductsByFilterParams,
    fetchProductsByGender,
    fetchProductsByIds,
    fetchProductsByIdsQuery,
    fetchProductsByProductr,
    fetchProductsByQuery
} from "../../../redux/thunks/product-thunks";
import {InitialStateType} from "../../../redux/reducers/product-reducer";
import {API_BASE_URL} from "../../../utils/constants/url";

const middlewares = [thunk];
const mockStore = configureMockStore<InitialStateType, ThunkDispatch<InitialStateType, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

describe("product actions", () => {

    beforeEach(() => {
        store.clearActions();
    });

    test("fetchProducts should dispatches LOADING_PERFUME and FETCH_PRODUCTS on success", async () => {
        mock.onGet(API_BASE_URL + "/products").reply(200, productsData);
        await store.dispatch(fetchProducts());
        let expectedActions = [loadingProduct(), getProducts(productsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchProduct should dispatches LOADING_PERFUME and FETCH_PERFUME_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + "/products/34").reply(200, productData);
        await store.dispatch(fetchProduct("34"));
        let expectedActions = [loadingProduct(), fetchProductSuccess(productData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchProductsByIds should dispatches LOADING_PERFUME and FETCH_PRODUCTS on success", async () => {
        mock.onPost(API_BASE_URL + "/products/ids").reply(200, productsData);
        await store.dispatch(fetchProductsByIds([34, 35, 38]));
        let expectedActions = [loadingProduct(), getProducts(productsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchProductsByFilterParams should dispatches LOADING_PERFUME and FETCH_PRODUCTS_BY_FILTER_PARAMS_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/products/search").reply(200, productsData);
        await store.dispatch(fetchProductsByFilterParams({productrs: ["Creed"], genders: [], prices: []}));
        let expectedActions = [loadingProduct(), fetchProductsByFilterParamsSuccess(productsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchProductsByGender should dispatches LOADING_PERFUME and FETCH_PRODUCTS_BY_GENDER_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/products/search/gender").reply(200, productsData);
        await store.dispatch(fetchProductsByGender({productGender: "male"}));
        let expectedActions = [loadingProduct(), fetchProductsByGenderSuccess(productsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchProductsByProductr should dispatches LOADING_PERFUME and FETCH_PRODUCTS_BY_PERFUMER_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/products/search/productr").reply(200, productsData);
        await store.dispatch(fetchProductsByProductr({productr: "Creed"}));
        let expectedActions = [loadingProduct(), fetchProductsByProductrSuccess(productsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchProductsByQuery should dispatches LOADING_PERFUME and FETCH_PRODUCTS_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/products/graphql/products").reply(200, {data: {products: productsData}});
        await store.dispatch(fetchProductsByQuery());
        let expectedActions = [loadingProduct(), fetchProductsByQuerySuccess(productsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchProductByQuery should dispatches FETCH_PERFUME_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/products/graphql/product").reply(200, {data: {product: productData}});
        await store.dispatch(fetchProductByQuery("1"));
        let expectedActions = [loadingProduct(), fetchProductByQuerySuccess(productData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchProductsByIdsQuery should dispatches LOADING_PERFUME and FETCH_PRODUCTS_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/products/graphql/ids").reply(200, {data: {productsIds: productsData}});
        await store.dispatch(fetchProductsByIdsQuery([34, 35, 38]));
        let expectedActions = [loadingProduct(), fetchProductsByQuerySuccess(productsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
