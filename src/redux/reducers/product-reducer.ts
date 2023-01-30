import {Product, Review} from "../../types/types";
import {
    LOADING_PERFUME,
    FETCH_PRODUCTS,
    FETCH_PERFUME_SUCCESS,
    FETCH_PRODUCTS_BY_FILTER_PARAMS_SUCCESS,
    FETCH_PRODUCTS_BY_GENDER_SUCCESS,
    FETCH_PRODUCTS_BY_PERFUMER_SUCCESS,
    FETCH_PRODUCTS_BY_QUERY_SUCCESS,
    FETCH_PERFUME_BY_QUERY_SUCCESS,
    ProductActionTypes
} from "../action-types/product-action-types";

export type InitialStateType = {
    products: Array<Product>,
    product: Partial<Product>,
    reviews: Array<Review>,
    isProductLoading: boolean
};

const initialState: InitialStateType = {
    products: [],
    product: {},
    reviews: [],
    isProductLoading: false
};

const reducer = (state: InitialStateType = initialState, action: ProductActionTypes): InitialStateType => {

    switch (action.type) {
        case LOADING_PERFUME:
            return {...state, isProductLoading: true};

        case FETCH_PRODUCTS:
            return {...state, products: action.payload, isProductLoading: false};

        case FETCH_PRODUCTS_BY_QUERY_SUCCESS:
            return {...state, products: action.payload, isProductLoading: false};

        case FETCH_PERFUME_SUCCESS:
            return {...state, product: action.payload, reviews: action.payload.reviews, isProductLoading: false};

        case FETCH_PERFUME_BY_QUERY_SUCCESS:
            return {...state, product: action.payload, reviews: action.payload.reviews, isProductLoading: false};

        case FETCH_PRODUCTS_BY_GENDER_SUCCESS:
            return {...state, products: action.payload, isProductLoading: false};

        case FETCH_PRODUCTS_BY_PERFUMER_SUCCESS:
            return {...state, products: action.payload, isProductLoading: false};

        case FETCH_PRODUCTS_BY_FILTER_PARAMS_SUCCESS:
            return {...state, products: action.payload, isProductLoading: false};

        default:
            return state;
    }
};

export default reducer;
