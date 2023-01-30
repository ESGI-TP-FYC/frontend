import {Product} from "../../types/types";

export const LOADING_PERFUME = "LOADING_PERFUME";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PERFUME_SUCCESS = "FETCH_PERFUME_SUCCESS";
export const FETCH_PRODUCTS_BY_GENDER_SUCCESS = "FETCH_PRODUCTS_BY_GENDER_SUCCESS";
export const FETCH_PRODUCTS_BY_PERFUMER_SUCCESS = "FETCH_PRODUCTS_BY_PERFUMER_SUCCESS";
export const FETCH_PRODUCTS_BY_FILTER_PARAMS_SUCCESS = "FETCH_PRODUCTS_BY_FILTER_PARAMS_SUCCESS";
export const FETCH_PRODUCTS_BY_QUERY_SUCCESS = "FETCH_PRODUCTS_BY_QUERY_SUCCESS";
export const FETCH_PERFUME_BY_QUERY_SUCCESS = "FETCH_PERFUME_BY_QUERY_SUCCESS";

export type LoadingProductActionType = { type: typeof LOADING_PERFUME};
export type GetProductsActionType = { type: typeof FETCH_PRODUCTS, payload: Array<Product> };
export type FetchProductSuccessActionType = { type: typeof FETCH_PERFUME_SUCCESS, payload: Product };
export type FetchProductsByGenderSuccessActionType = { type: typeof FETCH_PRODUCTS_BY_GENDER_SUCCESS, payload: Array<Product> };
export type FetchProductsByProductrSuccessActionType = { type: typeof FETCH_PRODUCTS_BY_PERFUMER_SUCCESS, payload: Array<Product> };
export type FetchProductsByFilterParamsSuccessActionType = { type: typeof FETCH_PRODUCTS_BY_FILTER_PARAMS_SUCCESS, payload: Array<Product> };
export type FetchProductsByQuerySuccessActionType = { type: typeof FETCH_PRODUCTS_BY_QUERY_SUCCESS, payload: Array<Product> };
export type FetchProductByQuerySuccessActionType = { type: typeof FETCH_PERFUME_BY_QUERY_SUCCESS, payload: Product };

export type ProductActionTypes = LoadingProductActionType |FetchProductsByQuerySuccessActionType |
    FetchProductByQuerySuccessActionType | FetchProductSuccessActionType | FetchProductsByGenderSuccessActionType |
    FetchProductsByProductrSuccessActionType | GetProductsActionType | FetchProductsByFilterParamsSuccessActionType;
