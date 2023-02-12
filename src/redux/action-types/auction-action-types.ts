import {Auction, AuctionErrors, BidProductErrors} from "../../types/types";
import {FETCH_ALL_USERS_ORDERS_BY_QUERY_SUCCESS} from "./admin-action-types";

export const LOADING_AUCTION = "LOADING_AUCTION";
export const FORM_RESET = "FORM_RESET";

export const AUCTION_ADDED_FAILURE = "AUCTION_ADDED_FAILURE";
export const AUCTION_ADDED_SUCCESS = "AUCTION_ADDED_SUCCESS";
export const BIDPRODUCT_ADDED_FAILURE = "BIDPRODUCT_ADDED_FAILURE";
export const BIDPRODUCT_ADDED_SUCCESS = "BIDPRODUCT_ADDED_SUCCESS";
export const BID_ADDED_FAILURE = "BID_ADDED_FAILURE";
export const BID_ADDED_SUCCESS = "BID_ADDED_SUCCESS";
export const FETCH_ALL_AUCTIONS_FAILURE = "FETCH_ALL_AUCTIONS_FAILURE";
export const FETCH_ALL_AUCTIONS_SUCCESS = "FETCH_ALL_AUCTIONS_SUCCESS";

export type LoadingAuctionActionType = { type: typeof LOADING_AUCTION };
export type ResetActionType = { type: typeof FORM_RESET }

export type AddAuctionSuccessActionType = { type: typeof AUCTION_ADDED_SUCCESS , payload: Auction};
export type AddAuctionFailureActionType = { type: typeof AUCTION_ADDED_FAILURE, payload: AuctionErrors };
export type AddBidProductSuccessActionType = { type: typeof BIDPRODUCT_ADDED_SUCCESS };
export type AddBidProductFailureActionType = { type: typeof BIDPRODUCT_ADDED_FAILURE, payload: BidProductErrors };
export type AddBidSuccessActionType = { type: typeof BID_ADDED_SUCCESS };
export type AddBidFailureActionType = { type: typeof BID_ADDED_FAILURE, payload: BidProductErrors };
export type FetchAllAuctionsSuccessActionType = { type: typeof FETCH_ALL_AUCTIONS_SUCCESS ,payload: Array<Auction>};
export type FetchAllAuctionsFailureActionType = { type: typeof FETCH_ALL_AUCTIONS_FAILURE, payload: AuctionErrors };

export type AuctionActionTypes = LoadingAuctionActionType | ResetActionType | AddAuctionSuccessActionType | AddAuctionFailureActionType
    | AddBidProductSuccessActionType | AddBidProductFailureActionType | FetchAllAuctionsSuccessActionType | FetchAllAuctionsFailureActionType
    | AddBidSuccessActionType | AddBidFailureActionType;
