import React, {FC, useEffect, useState} from 'react';
import {Auction, Bid, BidProduct, Product, User} from "../../types/types";
import { useForm } from 'react-hook-form';
import {addAuction, addBid, addProduct, fetchAuctions, formReset} from "../../redux/thunks/auction-thunks";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers/root-reducer";
import ToastShow from "../Toasts/ToastShow";

type PropTypes = {
    auctionId?: number
    product?: BidProduct
    bidAmount: (product: BidProduct) => any
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>
};

const BidModal: FC<PropTypes> = ({auctionId,product,bidAmount, setModalActive}) => {
    const usersData: Partial<User> = useSelector((state: AppStateType) => state.user.user);
    const isBidAdded: boolean = useSelector((state: AppStateType) => state.auction.isBidAdded);
    const [bidValue, setBidValue] = useState<number>(product ? bidAmount(product) : 0);
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (isBidAdded) {
            setShowToast(true);
            dispatch(fetchAuctions())
            setTimeout(() => {
                setShowToast(false)
                setModalActive(false)
            }, 5000);
            window.scrollTo(0, 0);
        }
    }, [isBidAdded]);


    const validateBid = (value:any) => {
        if (value <= bidValue) {
            return "Bid must be greater than " + bidValue;
        }
    };

    const onFormSubmit = (event: any): void => {
        let bid : Partial<Bid>= {
            date: new Date,
            amount: event.bid,
            userEmail: usersData.email
        };
        setBidValue(event.bid)
        const productId = product ? product.id : undefined;
        dispatch(addBid(auctionId,productId,bid))
    };

    return (
        <>
            <ToastShow showToast={showToast} message={"Bid successfully added!"}/>
            <div className="modal-open">
                <div className="modal fade show" style={{display: "block"}}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <form onSubmit={handleSubmit(onFormSubmit)}>
                            <div className="modal-header">
                                <h5 className="modal-title">Place a Bid</h5>
                                <button type="button" className="close" onClick={() => setModalActive(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="row modal-body">
                                <div className="col-md-6">
                                    <h6>You must bid at least <span>${bidValue}</span>.00</h6>
                                </div>
                            </div>
                            <div className="row modal-body">
                                <div className="col-md-12">
                                    <input type="number" defaultValue={bidValue.toString()}
                                           {...register('bid', { required: true, validate: validateBid })}/>
                                </div> <div className="col-md-6">
                                {errors.bid && <span style={{color: "red"}}>{errors.bid.message}</span>}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={() => setModalActive(false)}>Close
                                </button>
                                {(localStorage.getItem("userRole") !== "ADMIN") && <button type="submit"
                                        className="btn btn-primary"
                                >Place a Bid
                                </button> }
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default BidModal;
