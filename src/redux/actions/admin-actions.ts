import {Order, ProductErrors, User} from "../../types/types";
import {
    AddProductFailureActionType,
    AddProductSuccessActionType, FETCH_ALL_USERS_BY_QUERY_SUCCESS,
    FETCH_ALL_USERS_ORDERS_SUCCESS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_USER_INFO_BY_QUERY_SUCCESS,
    FETCH_USER_INFO_SUCCESS,
    FETCH_USER_ORDERS_BY_QUERY_SUCCESS,
    FETCH_USER_ORDERS_SUCCESS,
    FORM_RESET,
    GetAllUsersActionType,
    GetAllUsersByQueryActionType,
    GetAllUsersOrdersActionType,
    GetAllUsersOrdersByQueryActionType,
    GetUserInfoActionType,
    GetUserInfoByQueryActionType,
    GetUserOrdersActionType,
    GetUserOrdersByQueryActionType,
    LOADING_DATA,
    LoadingDataActionType,
    PRODUCT_ADDED_FAILURE,
    PRODUCT_ADDED_SUCCESS,
    PRODUCT_UPDATED_FAILURE,
    PRODUCT_UPDATED_SUCCESS,
    ResetActionType,
    UpdateProductFailureActionType,
    UpdateProductSuccessActionType,
    FETCH_ALL_USERS_ORDERS_BY_QUERY_SUCCESS
} from "../action-types/admin-action-types";
import {Action} from "redux";

export const loadingData = (): LoadingDataActionType => ({
    type: LOADING_DATA
});

export const addProductSuccess = (): AddProductSuccessActionType => ({
    type: PRODUCT_ADDED_SUCCESS
});

export const addProductFailure = (error: ProductErrors): AddProductFailureActionType => ({
    type: PRODUCT_ADDED_FAILURE,
    payload: error
});

export const updateProductSuccess = (): UpdateProductSuccessActionType => ({
    type: PRODUCT_UPDATED_SUCCESS
});

export const updateProductFailure = (error: ProductErrors): UpdateProductFailureActionType => ({
    type: PRODUCT_UPDATED_FAILURE,
    payload: error
});

export const getAllUsersOrders = (orders: Array<Order>): GetAllUsersOrdersActionType => ({
    type: FETCH_ALL_USERS_ORDERS_SUCCESS,
    payload: orders
});

export const getUserOrders = (orders: Array<Order>): GetUserOrdersActionType => ({
    type: FETCH_USER_ORDERS_SUCCESS,
    payload: orders
});

export const getAllUsers = (users: Array<User>): GetAllUsersActionType => ({
    type: FETCH_ALL_USERS_SUCCESS,
    payload: users
});

export const getUserInfo = (user: User): GetUserInfoActionType => ({
    type: FETCH_USER_INFO_SUCCESS,
    payload: user
});

export const reset = (): ResetActionType => ({
    type: FORM_RESET
});

export const getUserInfoByQuery = (user: User): GetUserInfoByQueryActionType => ({
    type: FETCH_USER_INFO_BY_QUERY_SUCCESS,
    payload: user
});

export const getAllUsersByQuery = (users: Array<User>): GetAllUsersByQueryActionType => ({
    type: FETCH_ALL_USERS_BY_QUERY_SUCCESS,
    payload: users
});

export const getAllUsersOrdersByQuery = (orders: Array<Order>): GetAllUsersOrdersByQueryActionType => ({
    type: FETCH_ALL_USERS_ORDERS_BY_QUERY_SUCCESS,
    payload: orders
});

export const getUserOrdersByQuery = (orders: Array<Order>): GetUserOrdersByQueryActionType => ({
    type: FETCH_USER_ORDERS_BY_QUERY_SUCCESS,
    payload: orders
});