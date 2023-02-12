import {Dispatch} from "redux";

import {
    addAuctionSuccess,
    addAuctionFailure,
    reset,
    addBidProductSuccess,
    addBidProductFailure,
    loadingAuction,
    fetchAllAuctionsSuccess,
    fetchAllAuctionsFailure,
    addBidSuccess, addBidFailure,
} from "../actions/auction-actions";
import RequestService from '../../utils/request-service';
import {Auction, Bid, BidProduct} from "../../types/types";
import {getProducts, loadingProduct} from "../actions/product-actions";

interface SubForm {
    productTitle: string
    productr: string
    year: string
    country: string
    type: string
    volume: string
    productGender: string
    fragranceTopNotes: string
    fragranceMiddleNotes: string
    fragranceBaseNotes: string
    price: string
    file: string | Blob
}
export const addAuction = (auction: Partial<Auction>, subForms: SubForm[]) => async (dispatch: Dispatch) => {
    try {
        const response =  await RequestService.post("/auction", auction, true)
        console.log(response)
        dispatch(addAuctionSuccess(response.data));
    } catch (error) {
        dispatch(addAuctionFailure(error.response.data));
    }
};

export const addProduct = (id: number | undefined, data: FormData) => async (dispatch: Dispatch) => {
    if(id){
        try {
            await RequestService.post("/auction/"+ id+"/product", data, true, "multipart/form-data")
            dispatch(addBidProductSuccess());
        } catch (error) {
            dispatch(addBidProductFailure(error.response.data));
        }
    }
};

export const formReset = () => async (dispatch: Dispatch) => {
    dispatch(reset());
};

export const fetchAuctions = () => async (dispatch: Dispatch) => {
    try {
        dispatch(loadingAuction());
        const response = await RequestService.get("/auction", true);
        dispatch(fetchAllAuctionsSuccess(response.data));
    } catch (error) {
        dispatch(fetchAllAuctionsFailure(error.response.data));
    }
};

export const addBid = (id: number | undefined, productId: number | undefined, data: Partial<Bid>) => async (dispatch: Dispatch) => {
    if(id && productId){
        try {
            dispatch(loadingAuction());
            await RequestService.post("/auction/"+ id+"/product/"+productId+"/bid", data, true,)
            dispatch(addBidSuccess());
        } catch (error) {
            dispatch(addBidFailure(error.response.data));
        }
    }
};
