import {Dispatch} from "redux";

import {
    getProducts,
    fetchProductsByQuerySuccess,
    fetchProductByQuerySuccess,
    fetchProductsByFilterParamsSuccess,
    fetchProductsByGenderSuccess,
    fetchProductsByProductrSuccess,
    fetchProductSuccess,
    loadingProduct
} from "../actions/product-actions";
import {FilterParamsType, Product} from "../../types/types";
import {geProductsByIdsQuery, getAllProductsByQuery, getProductByQuery} from "../../utils/graphql-query/product-query";
import RequestService from '../../utils/request-service';

export const fetchProducts = () => async (dispatch: Dispatch) => {
    dispatch(loadingProduct());
    const response = await RequestService.get("/products");
    dispatch(getProducts(response.data));
};

export const fetchProduct = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingProduct());
    const response = await RequestService.get("/products/" + id);
    dispatch(fetchProductSuccess(response.data));
};

export const fetchProductsByIds = (ids: Array<number>) => async (dispatch: Dispatch) => {
    dispatch(loadingProduct());
    const response = await RequestService.post("/products/ids", ids);
    dispatch(getProducts(response.data));
};

export const fetchProductsByFilterParams = (filter: FilterParamsType) => async (dispatch: Dispatch) => {
    dispatch(loadingProduct());
    const response = await RequestService.post("/products/search", filter);
    dispatch(fetchProductsByFilterParamsSuccess(response.data));
};

export const fetchProductsByGender = (gender: { productGender: string }) => async (dispatch: Dispatch) => {
    dispatch(loadingProduct());
    const response = await RequestService.post("/products/search/gender", gender);
    dispatch(fetchProductsByGenderSuccess(response.data));
};

export const fetchProductsByProductr = (productr: { productr: string }) => async (dispatch: Dispatch) => {
    dispatch(loadingProduct());
    const response = await RequestService.post("/products/search/productr", productr);
    dispatch(fetchProductsByProductrSuccess(response.data));
};

export const fetchProductReviewsWS = (response: Product) => async (dispatch: Dispatch) => {
    dispatch(fetchProductSuccess(response));
};

// GraphQL thunks
export const fetchProductsByQuery = () => async (dispatch: Dispatch) => {
    dispatch(loadingProduct());
    const response = await RequestService.post("/products/graphql/products", {query: getAllProductsByQuery});
    dispatch(fetchProductsByQuerySuccess(response.data.data.products));
};

export const fetchProductByQuery = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingProduct());
    const response = await RequestService.post("/products/graphql/product", {query: getProductByQuery(id)});
    dispatch(fetchProductByQuerySuccess(response.data.data.product));
};

export const fetchProductsByIdsQuery = (ids: Array<number>) => async (dispatch: Dispatch) => {
    dispatch(loadingProduct());
    const response = await RequestService.post("/products/graphql/ids", {query: geProductsByIdsQuery(ids)});
    dispatch(fetchProductsByQuerySuccess(response.data.data.productsIds));
};
