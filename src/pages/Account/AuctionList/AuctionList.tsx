import React, {FC, useEffect, useState} from 'react';
import {Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Auction, BidProduct} from "../../../types/types";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import AuctionListComponent from "./AuctionListComponent";
import ScrollButton from "../../../component/ScrollButton/ScrollButton";
import {fetchAuctions} from "../../../redux/thunks/auction-thunks";

const AuctionList: FC = () => {
    const dispatch = useDispatch();
    const auctions: Array<Auction> = useSelector((state: AppStateType) => state.auction.auctions);

    useEffect(() => {
        dispatch(fetchAuctions());
    }, []);

    const itemsPerPage = 24;
    const searchByData = [
        {label: 'Brand', value: 'productr'},
        {label: 'Product title', value: 'productTitle'},
        {label: 'Manufacturer country', value: 'country'},
        {label: 'Gender', value: 'productGender'}
    ];

    return (
        <div className="container">
            <ScrollButton/>
            <Route exact component={() =>
                <AuctionListComponent
                    data={auctions}
                    itemsPerPage={itemsPerPage}
                    searchByData={searchByData}/>}/>
        </div>
    );
};

export default AuctionList;
