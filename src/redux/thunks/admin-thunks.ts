import {Dispatch} from "redux";

import {
    addProductFailure,
    addProductSuccess,
    getAllUsers,
    getAllUsersOrders,
    getUserInfo,
    getUserOrders,
    reset,
    updateProductFailure,
    updateProductSuccess,
    getAllUsersByQuery,
    getAllUsersOrdersByQuery,
    getUserInfoByQuery,
    getUserOrdersByQuery,
    loadingData,
} from "../actions/admin-actions";
import {fetchProductSuccess, getProducts} from "../actions/product-actions";
import RequestService from '../../utils/request-service';
import {userByQuery, usersByQuery} from "../../utils/graphql-query/users-query";
import {ordersByEmailQuery, ordersByQuery} from "../../utils/graphql-query/orders-query";

export const addProduct = (data: FormData) => async (dispatch: Dispatch) => {
    try {
        await RequestService.post("/admin/add", data, true, "multipart/form-data")
        dispatch(addProductSuccess());
    } catch (error) {
        dispatch(addProductFailure(error.response.data));
    }
};

export const updateProduct = (data: FormData) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.post("/admin/edit", data, true, "multipart/form-data");
        dispatch(updateProductSuccess());
        dispatch(fetchProductSuccess(response.data));
    } catch (error) {
        dispatch(updateProductFailure(error.response.data));
    }
};

export const deleteProduct = (id?: number) => async (dispatch: Dispatch) => {
    const response = await RequestService.delete("/admin/delete/" + id, true);
    dispatch(getProducts(response.data));
};

export const fetchAllUsersOrders = () => async (dispatch: Dispatch) => {
    dispatch(loadingData());
    const response = await RequestService.get("/admin/orders", true);
    dispatch(getAllUsersOrders(response.data));
};

export const fetchUserOrders = (email: string | undefined) => async (dispatch: Dispatch) => {
    const response = await RequestService.post("/admin/order", {email: email}, true);
    dispatch(getUserOrders(response.data));
};

export const fetchAllUsers = () => async (dispatch: Dispatch) => {
    dispatch(loadingData());
    const response = await RequestService.get("/admin/user/all", true);
    dispatch(getAllUsers(response.data));
};

export const fetchUserInfo = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingData());
    const response = await RequestService.get("/admin/user/" + id, true);
    dispatch(getUserInfo(response.data));
};

export const formReset = () => async (dispatch: Dispatch) => {
    dispatch(reset());
};

//GraphQL thunks
export const fetchUserInfoByQuery = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingData());
    const response = await RequestService.post("/admin/graphql/user", {query: userByQuery(id)}, true);
    dispatch(getUserInfoByQuery(response.data.data.user));
};

export const fetchAllUsersByQuery = () => async (dispatch: Dispatch) => {
    dispatch(loadingData());
    const response = await RequestService.post("/admin/graphql/user/all", {query: usersByQuery}, true);
    dispatch(getAllUsersByQuery(response.data.data.users));
};

export const fetchAllUsersOrdersByQuery = () => async (dispatch: Dispatch) => {
    dispatch(loadingData());
    const response = await RequestService.post("/admin/graphql/orders", {query: ordersByQuery}, true);
    dispatch(getAllUsersOrdersByQuery(response.data.data.orders));
};

export const fetchUserOrdersByEmailQuery = (email: string | undefined) => async (dispatch: Dispatch) => {
    dispatch(loadingData());
    const response = await RequestService.post("/admin/graphql/order", {query: ordersByEmailQuery(email)}, true);
    dispatch(getUserOrdersByQuery(response.data.data.ordersByEmail));
};
