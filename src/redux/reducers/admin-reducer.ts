import {
    PRODUCT_ADDED_SUCCESS,
    PRODUCT_UPDATED_SUCCESS,
    PRODUCT_ADDED_FAILURE,
    PRODUCT_UPDATED_FAILURE,
    FETCH_USER_INFO_SUCCESS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_ORDERS_SUCCESS,
    FETCH_USER_ORDERS_SUCCESS,
    FORM_RESET,
    FETCH_USER_INFO_BY_QUERY_SUCCESS,
    FETCH_ALL_USERS_BY_QUERY_SUCCESS,
    FETCH_ALL_USERS_ORDERS_BY_QUERY_SUCCESS,
    FETCH_USER_ORDERS_BY_QUERY_SUCCESS,
    LOADING_DATA
} from "../action-types/admin-action-types";
import {AuctionErrors, Order, ProductErrors, User} from "../../types/types";
import {AdminActionTypes} from "../action-types/admin-action-types";
import {Action} from "redux";

export type InitialStateType = {
    orders: Array<Order>
    userOrders: Array<Order>
    users: Array<User>
    user: Partial<User>
    errors: Partial<ProductErrors>
    isProductAdded: boolean
    isProductEdited: boolean
    isLoaded: boolean
    auctionErrors: Partial<AuctionErrors>
    isAuctionAdded: boolean
};

const initialState: InitialStateType = {
    orders: [],
    userOrders: [],
    users: [],
    user: {},
    errors: {},
    isProductAdded: false,
    isProductEdited: false,
    isLoaded: false,
    auctionErrors: {},
    isAuctionAdded: false
};

const reducer = (state: InitialStateType = initialState, action: AdminActionTypes): InitialStateType => {

    switch (action.type) {
        case LOADING_DATA:
            return {...state, isLoaded: true};

        case PRODUCT_ADDED_SUCCESS:
            return {...state, isProductAdded: true, errors: {}};

        case PRODUCT_ADDED_FAILURE:
            return {...state, isProductAdded: false, errors: action.payload};

        case PRODUCT_UPDATED_SUCCESS:
            return {...state, isProductEdited: true, errors: {}};

        case PRODUCT_UPDATED_FAILURE:
            return {...state, isProductEdited: false, errors: action.payload};

        case FETCH_USER_INFO_SUCCESS:
            return {...state, user: action.payload, isLoaded: false};

        case FETCH_ALL_USERS_SUCCESS:
            return {...state, users: action.payload, isLoaded: false};

        case FETCH_ALL_USERS_ORDERS_SUCCESS:
            return {...state, orders: action.payload, isLoaded: false};

        case FETCH_USER_ORDERS_SUCCESS:
            return {...state, userOrders: action.payload};

        case FETCH_USER_INFO_BY_QUERY_SUCCESS:
            return {...state, user: action.payload, isLoaded: false};

        case FETCH_ALL_USERS_BY_QUERY_SUCCESS:
            return {...state, users: action.payload, isLoaded: false};

        case FETCH_ALL_USERS_ORDERS_BY_QUERY_SUCCESS:
            return {...state, orders: action.payload, isLoaded: false};

        case FETCH_USER_ORDERS_BY_QUERY_SUCCESS:
            return {...state, userOrders: action.payload, isLoaded: false};

        case FORM_RESET:
            return {...state, isProductAdded: false, isProductEdited: false, errors: {}};

        default:
            return state;
    }
};

export default reducer;
