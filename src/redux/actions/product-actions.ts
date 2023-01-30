import {Product} from "../../types/types";
import {
    LOADING_PERFUME,
    FETCH_PRODUCTS,
    FETCH_PERFUME_SUCCESS,
    FETCH_PRODUCTS_BY_FILTER_PARAMS_SUCCESS,
    FETCH_PRODUCTS_BY_GENDER_SUCCESS,
    FETCH_PRODUCTS_BY_PERFUMER_SUCCESS,
    FETCH_PRODUCTS_BY_QUERY_SUCCESS,
    FETCH_PERFUME_BY_QUERY_SUCCESS,
    FetchProductsByQuerySuccessActionType,
    FetchProductByQuerySuccessActionType,
    FetchProductsByFilterParamsSuccessActionType,
    FetchProductsByGenderSuccessActionType,
    FetchProductsByProductrSuccessActionType,
    FetchProductSuccessActionType,
    GetProductsActionType,
    LoadingProductActionType
} from "../action-types/product-action-types";

export const loadingProduct = (): LoadingProductActionType => ({
    type: LOADING_PERFUME
});

export const getProducts = (products: Array<Product>): GetProductsActionType => ({
    type: FETCH_PRODUCTS,
    payload: products
});

export const fetchProductsByQuerySuccess = (products: Array<Product>): FetchProductsByQuerySuccessActionType => ({
    type: FETCH_PRODUCTS_BY_QUERY_SUCCESS,
    payload: products
});

export const fetchProductByQuerySuccess = (product: Product): FetchProductByQuerySuccessActionType => ({
    type: FETCH_PERFUME_BY_QUERY_SUCCESS,
    payload: product
});

export const fetchProductSuccess = (product: Product): FetchProductSuccessActionType => ({
    type: FETCH_PERFUME_SUCCESS,
    payload: product
});

export const fetchProductsByGenderSuccess = (products: Array<Product>): FetchProductsByGenderSuccessActionType => ({
    type: FETCH_PRODUCTS_BY_GENDER_SUCCESS,
    payload: products
});

export const fetchProductsByProductrSuccess = (products: Array<Product>): FetchProductsByProductrSuccessActionType => ({
    type: FETCH_PRODUCTS_BY_PERFUMER_SUCCESS,
    payload: products
});

export const fetchProductsByFilterParamsSuccess = (products: Array<Product>): FetchProductsByFilterParamsSuccessActionType => ({
    type: FETCH_PRODUCTS_BY_FILTER_PARAMS_SUCCESS,
    payload: products
});
