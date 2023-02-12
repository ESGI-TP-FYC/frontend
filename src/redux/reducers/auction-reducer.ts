import {
    AUCTION_ADDED_FAILURE,
    AUCTION_ADDED_SUCCESS,
    AuctionActionTypes, BID_ADDED_SUCCESS,
    BIDPRODUCT_ADDED_FAILURE,
    BIDPRODUCT_ADDED_SUCCESS,
    FETCH_ALL_AUCTIONS_FAILURE,
    FETCH_ALL_AUCTIONS_SUCCESS, LOADING_AUCTION, BID_ADDED_FAILURE
} from "../action-types/auction-action-types";
import {Auction} from "../../types/types";

export type InitialStateType = {
    errors: any
    auction: Partial<Auction>,
    auctions: Array<Auction>,
    isAuctionAdded: boolean
    isBidProductAdded: boolean
    isBidAdded: boolean
    isAuctionLoading: boolean
};

const initialState: InitialStateType = {
    errors: {},
    auction: {},
    auctions: [],
    isAuctionAdded: false,
    isBidProductAdded: false,
    isBidAdded: false,
    isAuctionLoading: false
};

const reducer = (state: InitialStateType = initialState, action: AuctionActionTypes): InitialStateType => {

    switch (action.type) {
        case LOADING_AUCTION:
            return {...state, isAuctionAdded: true};

        case AUCTION_ADDED_SUCCESS:
            return {...state, isAuctionAdded: true, errors: {},auction:action.payload};

        case AUCTION_ADDED_FAILURE:
            return {...state, isAuctionAdded: false, errors: action.payload};

        case BIDPRODUCT_ADDED_SUCCESS:
            return {...state, isBidProductAdded: true, errors: {}};

        case BIDPRODUCT_ADDED_FAILURE:
            return {...state, isBidProductAdded: false, errors: action.payload};

        case BID_ADDED_SUCCESS:
            return {...state, isBidAdded: true, errors: {}};

        case BID_ADDED_FAILURE:
            return {...state, isBidAdded: false, errors: action.payload};

        case FETCH_ALL_AUCTIONS_SUCCESS:
            return {...state, isAuctionLoading: false, errors: {},auctions:action.payload};

        case FETCH_ALL_AUCTIONS_FAILURE:
            return {...state, isAuctionLoading: false, errors: action.payload};

        default:
            return state;
    }
};

export default reducer;
