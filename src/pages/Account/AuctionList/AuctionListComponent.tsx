import React, {FC, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faList} from "@fortawesome/free-solid-svg-icons";
import {LazyLoadImage} from "react-lazy-load-image-component";

import usePagination from "../../../component/Pagination/usePagination";
import {Auction, BidProduct} from "../../../types/types";
import PaginationItem from "../../../component/Pagination/PaginationItem";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import Spinner from '../../../component/Spinner/Spinner';
import {Card} from "react-bootstrap";
import BidModal from "../../../component/Modal/BidModal";

type PropsType = {
    data: Array<Auction>
    itemsPerPage: number
    startFrom?: number
    searchByData: Array<{ label: string, value: string }>
};

const AuctionListComponent: FC<PropsType> = ({data, itemsPerPage, startFrom, searchByData}) => {
    const dispatch = useDispatch();
    const loading: boolean = useSelector((state: AppStateType) => state.auction.isAuctionLoading);
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [productInfo, setProductInfo] = useState<BidProduct>();
    const [auctionId, setAuctionId] = useState<number>();

    const {
        slicedData,
        pagination,
        prevPage,
        nextPage,
        changePage,
        setFilteredData,
        setSearching
    } = usePagination({itemsPerPage, data, startFrom});

    const bidAmount = (product: BidProduct): any => {
        return product.bids.length > 0 ? Math.max(...product.bids.map(bid => bid.amount)) : product.price;
    };

    const showBidModalWindow = (product: BidProduct,id: number): void => {
        setAuctionId(id)
        setModalActive(true);
        setProductInfo(product);
    };

    return (
        <>
            {modalActive ?
                <BidModal auctionId={auctionId}
                          product={productInfo}
                          bidAmount={bidAmount}
                          setModalActive={setModalActive}/> : null}
            <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faList}/> List of auctions</h4>
            <br/>
            <div className="mt-3">
                <PaginationItem
                    pagination={pagination}
                    prevPage={prevPage}
                    changePage={changePage}
                    nextPage={nextPage}/>
            </div>
            {loading ? <Spinner/> :
                <>
                    <div className="container-fluid mt-3">
                        <div className="row">
                            {slicedData.map((auction: Auction) => {

                                return (
                                    auction.products.map((product: BidProduct) => {
                                        return (
                                            <div key={product.id} className="col-lg-4">
                                                <Card className="card mb-5">
                                                    <Card.Header className="d-flex justify-content-center">
                                                        <h6>{new Date(auction.dateDebut).toISOString().slice(0, 10)} - {new Date(auction.dateFin).toISOString().slice(0, 10)}</h6>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <div style={{
                                                            height: "92px",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}>
                                                            <LazyLoadImage
                                                                effect="blur"
                                                                style={{width: "120px", marginTop: "25px"}}
                                                                src={`data:image/jpeg;base64,${product.file}`}/>
                                                        </div>
                                                        <div className="card-body text-center"
                                                             style={{marginTop: "40px"}}>
                                                            <h6>Title : {product.productTitle}</h6>
                                                            <h6>Brand : {product.productr}</h6>
                                                            <h6>Start price :<span>${product.price}</span>.00</h6>
                                                        </div>
                                                    </Card.Body>
                                                    <Card.Footer className="d-flex justify-content-end">
                                                        <button className="btn btn-warning mr-2"
                                                                onClick={() => showBidModalWindow(product,auction.id)}>
                                                            <FontAwesomeIcon className="fa-xs" icon={faCartPlus}/> Place Bid
                                                        </button>
                                                    </Card.Footer>
                                                </Card>
                                            </div>
                                        );
                                    })
                                )
                            })}
                        </div>
                    </div>
                    <PaginationItem
                        pagination={pagination}
                        prevPage={prevPage}
                        changePage={changePage}
                        nextPage={nextPage}/>
                </>
            }
        </>
    );
};

export default AuctionListComponent;
