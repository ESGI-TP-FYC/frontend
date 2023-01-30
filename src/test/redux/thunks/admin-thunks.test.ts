import thunk, {ThunkDispatch} from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {AnyAction} from "redux";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {InitialStateType} from "../../../redux/reducers/admin-reducer";
import {API_BASE_URL} from "../../../utils/constants/url";
import {productData, productErrorData, productsData} from "../../test-data/product-test-data";
import {
    addProduct,
    deleteProduct,
    fetchAllUsers,
    fetchAllUsersByQuery,
    fetchAllUsersOrders,
    fetchAllUsersOrdersByQuery,
    fetchUserInfo,
    fetchUserInfoByQuery,
    fetchUserOrders,
    fetchUserOrdersByEmailQuery,
    updateProduct
} from "../../../redux/thunks/admin-thunks";
import {
    addProductFailure,
    addProductSuccess,
    getAllUsers, getAllUsersByQuery,
    getAllUsersOrders, getAllUsersOrdersByQuery,
    getUserInfo, getUserInfoByQuery,
    getUserOrders, getUserOrdersByQuery, loadingData,
    updateProductFailure,
    updateProductSuccess
} from "../../../redux/actions/admin-actions";
import {fetchProductSuccess, getProducts} from "../../../redux/actions/product-actions";
import {ordersData} from "../../test-data/order-test-data";
import {userData, usersData} from "../../test-data/user-test-data";

const middlewares = [thunk];
const mockStore = configureMockStore<InitialStateType, ThunkDispatch<InitialStateType, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

describe("admin actions", () => {
    const bodyFormData: FormData = new FormData();

    beforeEach(() => {
        store.clearActions();
        bodyFormData.append("file", "file");
        bodyFormData.append("product", new Blob([JSON.stringify(productData)], {type: "application/json"}));
    });

    test("addProduct should dispatches USER_UPDATED_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/admin/add").reply(200);
        await store.dispatch(addProduct(bodyFormData));
        let expectedActions = [addProductSuccess()];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("addProduct should dispatches PERFUME_ADDED_FAILURE on failure", async () => {
        mock.onPost(API_BASE_URL + "/admin/add").reply(400, productErrorData);
        await store.dispatch(addProduct(bodyFormData));
        let expectedActions = [addProductFailure(productErrorData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("updateProduct should dispatches PERFUME_UPDATED_SUCCESS and FETCH_PERFUME_SUCCESS on success", async () => {
        mock.onPut(API_BASE_URL + "/admin/edit").reply(200, productData);
        await store.dispatch(updateProduct(bodyFormData));
        let expectedActions = [updateProductSuccess(), fetchProductSuccess(productData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("updateProduct should dispatches PERFUME_UPDATED_FAILURE on failure", async () => {
        mock.onPut(API_BASE_URL + "/admin/edit").reply(400, productErrorData);
        await store.dispatch(updateProduct(bodyFormData));
        let expectedActions = [updateProductFailure(productErrorData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("deleteProduct should dispatches FETCH_PRODUCTS on success", async () => {
        mock.onDelete(API_BASE_URL + "/admin/delete/1").reply(200, productsData);
        await store.dispatch(deleteProduct(1));
        let expectedActions = [getProducts(productsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchAllUsersOrders should dispatches LOADING_DATA and FETCH_ALL_USERS_ORDERS_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + "/admin/orders").reply(200, ordersData);
        await store.dispatch(fetchAllUsersOrders());
        let expectedActions = [loadingData(), getAllUsersOrders(ordersData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchUserOrders should dispatches FETCH_USER_ORDERS_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/admin/order").reply(200, ordersData);
        await store.dispatch(fetchUserOrders("test123@test.com"));
        let expectedActions = [getUserOrders(ordersData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchAllUsers should dispatches LOADING_DATA and FETCH_ALL_USERS_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + "/admin/user/all").reply(200, usersData);
        await store.dispatch(fetchAllUsers());
        let expectedActions = [loadingData(), getAllUsers(usersData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchUserInfo should dispatches LOADING_DATA and FETCH_USER_INFO_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + "/admin/user/1").reply(200, userData);
        await store.dispatch(fetchUserInfo("1"));
        let expectedActions = [loadingData(), getUserInfo(userData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchUserInfoByQuery should dispatches LOADING_DATA and FETCH_USER_INFO_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/admin/graphql/user").reply(200, {data: {user: userData}});
        await store.dispatch(fetchUserInfoByQuery("1"));
        let expectedActions = [loadingData(), getUserInfoByQuery(userData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchAllUsersByQuery should dispatches LOADING_DATA and FETCH_ALL_USERS_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/admin/graphql/user/all").reply(200, {data: {users: usersData}});
        await store.dispatch(fetchAllUsersByQuery());
        let expectedActions = [loadingData(), getAllUsersByQuery(usersData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchAllUsersOrdersByQuery should dispatches LOADING_DATA and FETCH_ALL_USERS_ORDERS_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/admin/graphql/orders").reply(200, {data: {orders: ordersData}});
        await store.dispatch(fetchAllUsersOrdersByQuery());
        let expectedActions = [loadingData(), getAllUsersOrdersByQuery(ordersData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchUserOrdersByEmailQuery should dispatches LOADING_DATA and FETCH_USER_ORDERS_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/admin/graphql/order").reply(200, {data: {ordersByEmail: ordersData}});
        await store.dispatch(fetchUserOrdersByEmailQuery("test123@test.com"));
        let expectedActions = [loadingData(), getUserOrdersByQuery(ordersData)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
