import {Auction, AuctionErrors, BidProductErrors} from "../../types/types";
import {
    AddAuctionFailureActionType,
    AddAuctionSuccessActionType, AddBidFailureActionType,
    AddBidProductFailureActionType,
    AddBidProductSuccessActionType, AddBidSuccessActionType,
    AUCTION_ADDED_FAILURE,
    AUCTION_ADDED_SUCCESS, BID_ADDED_FAILURE, BID_ADDED_SUCCESS,
    BIDPRODUCT_ADDED_FAILURE,
    BIDPRODUCT_ADDED_SUCCESS,
    FETCH_ALL_AUCTIONS_FAILURE,
    FETCH_ALL_AUCTIONS_SUCCESS,
    FetchAllAuctionsFailureActionType,
    FetchAllAuctionsSuccessActionType,
    FORM_RESET,
    LOADING_AUCTION,
    LoadingAuctionActionType,
    ResetActionType
} from "../action-types/auction-action-types";


export const loadingAuction = (): LoadingAuctionActionType => ({
    type: LOADING_AUCTION
});

export const addAuctionSuccess = (auction: Auction): AddAuctionSuccessActionType => <AddAuctionSuccessActionType>({
    type: AUCTION_ADDED_SUCCESS,
    payload: auction
});

export const addAuctionFailure = (error: AuctionErrors): AddAuctionFailureActionType => ({
    type: AUCTION_ADDED_FAILURE,
    payload: error
});

export const addBidProductSuccess = (): AddBidProductSuccessActionType => ({
    type: BIDPRODUCT_ADDED_SUCCESS
});

export const addBidProductFailure = (error: BidProductErrors): AddBidProductFailureActionType => ({
    type: BIDPRODUCT_ADDED_FAILURE,
    payload: error
});
export const addBidSuccess = (): AddBidSuccessActionType => ({
    type: BID_ADDED_SUCCESS
});

export const addBidFailure = (error: BidProductErrors): AddBidFailureActionType => ({
    type: BID_ADDED_FAILURE,
    payload: error
});

export const reset = (): ResetActionType => ({
    type: FORM_RESET
});

export const fetchAllAuctionsSuccess = (auctions: Array<Auction>): FetchAllAuctionsSuccessActionType => ({
    type: FETCH_ALL_AUCTIONS_SUCCESS,
    payload: auctions
});

export const fetchAllAuctionsFailure = (error: AuctionErrors): FetchAllAuctionsFailureActionType => ({
    type: FETCH_ALL_AUCTIONS_FAILURE,
    payload: error
});