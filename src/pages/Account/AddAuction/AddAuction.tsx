import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import ToastShow from "../../../component/Toasts/ToastShow";
import {addAuction, addProduct, formReset} from "../../../redux/thunks/auction-thunks";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import {Auction, AuctionErrors, BidProduct} from "../../../types/types";
import { Card } from 'react-bootstrap';

type InitialStateType = {
    dateDebut: string;
    dateFin: string;
};

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

const AddAuction: FC = () => {
    const dispatch = useDispatch();
    const isAuctionAdded: boolean = useSelector((state: AppStateType) => state.auction.isAuctionAdded);
    const addedAuction: Partial<Auction> = useSelector((state: AppStateType) => state.auction.auction);
    const errors: Partial<AuctionErrors> = useSelector((state: AppStateType) => state.auction.errors);

    const initialState: InitialStateType = {
        dateDebut: "",
        dateFin: ""
    };

    const [{
        dateDebut,
        dateFin
    }, setState] = useState(initialState);

    const [showToast, setShowToast] = useState(false);

    const [subForms, setSubForms] = useState<SubForm[]>([
        {
            productTitle: "",
            productr: "",
            year: "",
            country: "",
            type: "",
            volume: "",
            productGender: "",
            fragranceTopNotes: "",
            fragranceMiddleNotes: "",
            fragranceBaseNotes: "",
            price: "",
            file: ""
        }
    ]);
    const {
        dateDebutError,
        dateFinError
    } = errors;
    const [activeKey, setActiveKey] = useState('0');
    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
        const {name, value} = event.target;
        setState(prevState => ({...prevState, [name]: value}));
    };
    useEffect(() => {
        if (addedAuction) {
            subForms.forEach((subForm) => {
                let product:Partial<BidProduct> ={
                    productTitle: subForm.productTitle,
                    productr: subForm.productr,
                    year: Number(subForm.year),
                    country: subForm.country,
                    type: subForm.type,
                    volume: Number(subForm.volume),
                    productGender: subForm.productGender,
                    price: Number(subForm.price),
                }
                const bodyFormData: FormData = new FormData();
                bodyFormData.append("file", subForm.file);
                bodyFormData.append("product", new Blob([JSON.stringify(product)], {type: "application/json"}));
                dispatch(addProduct(addedAuction.id,bodyFormData));
            });
           setState({...initialState});
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false)
                dispatch(formReset());
            }, 2000);
            window.scrollTo(0, 0);
        }
    }, [addedAuction]);

    const onFormSubmit = (event: any): void => {
        event.preventDefault();

        let newAuction : Partial<Auction> = {dateDebut:new Date(dateDebut),dateFin:new Date(dateFin)};
        dispatch(addAuction(newAuction,subForms));
    };

    const handleAddSubForm = () => {
        setSubForms([...subForms, {
            productTitle: "",
            productr: "",
            year: "",
            country: "",
            type: "",
            volume: "",
            productGender: "",
            fragranceTopNotes: "",
            fragranceMiddleNotes: "",
            fragranceBaseNotes: "",
            price: "",
            file: ""
        }]);
    };

    const handleProductChange = (e: any, index: number) => {
        const name = e.target.name as keyof SubForm;
        const newSubForms = [...subForms];
        newSubForms[index][name] = name === "file" ? e.target.files[0] :e.target.value;
        setSubForms(newSubForms);
    };

    return (
        <>
            <ToastShow showToast={showToast} message={"Auction successfully added!"}/>
            <div className="container">
                <h4><FontAwesomeIcon className="mr-2" icon={faPlusSquare}/>Add Auction</h4>
                <br/>
                <form >
                    <div className="form row mt-3">
                        <div className="col">
                            <label>Start Date: </label>
                            <input
                                type="date"
                                className={dateDebutError ? "form-control is-invalid" : "form-control"}
                                name="dateDebut"
                                value={dateDebut}
                                placeholder="Enter the release year"
                                onChange={handleInputChange}/>
                            <div className="invalid-feedback">{dateDebutError}</div>
                        </div>
                        <div className="col">
                            <label>End Date: </label>
                            <input
                                type="date"
                                className={dateFinError ? "form-control is-invalid" : "form-control"}
                                name="dateFin"
                                value={dateFin}
                                placeholder="Enter the manufacturer country"
                                onChange={handleInputChange}/>
                            <div className="invalid-feedback">{dateDebutError}</div>
                        </div>
                    </div>
                    {subForms.map((subForm, index) => (
                        <Card key={index} style={{marginTop: "35px"}}>
                            <Card.Header>
                                <h3>Product {index + 1}</h3>
                            </Card.Header>
                            <Card.Body>
                                <div className="form row">
                                    <div className="col">
                                        <label>Product title: </label>
                                        <input
                                            type="text"
                                            className= "form-control"
                                            name="productTitle"
                                            value={subForm.productTitle}
                                            placeholder="Enter the product title"
                                            onChange={e=>handleProductChange(e,index)}/>
                                    </div>
                                    <div className="col">
                                        <label>Brand: </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="productr"
                                            value={subForm.productr}
                                            placeholder="Enter the brand"
                                            onChange={e=>handleProductChange(e,index)}/>
                                    </div>
                                </div>
                                <div className="form row mt-3">
                                    <div className="col">
                                        <label>Release year: </label>
                                        <input
                                            type="text"
                                            className= "form-control"
                                            name="year"
                                            value={subForm.year}
                                            placeholder="Enter the release year"
                                            onChange={e=>handleProductChange(e,index)}/>
                                    </div>
                                    <div className="col">
                                        <label>Manufacturer country: </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="country"
                                            value={subForm.country}
                                            placeholder="Enter the manufacturer country"
                                            onChange={e=>handleProductChange(e,index)}/>
                                    </div>
                                </div>
                                <div className="form row mt-3">
                                    <div className="col">
                                        <label>Product Style: </label>
                                        <select name="type"
                                                className="form-control"
                                                onChange={e=>handleProductChange(e,index)}>
                                            <option value="Basses">Basses</option>
                                            <option value="Mi-montantes">Mi-montantes</option>
                                            <option value="Montantes">Montantes</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label>Size: </label>
                                        <input
                                            type="number"
                                            min={20}
                                            max={54}
                                            className="form-control"
                                            name="volume"
                                            value={subForm.volume}
                                            placeholder="Enter the Size"
                                            onChange={e=>handleProductChange(e,index)}/>
                                    </div>
                                </div>
                                <div className="form row mt-3">
                                    <div className="col">
                                        <label>Gender: </label>
                                        <select name="productGender"
                                                className= "form-control"
                                                onChange={e=>handleProductChange(e,index)}>
                                            <option value="male">male</option>
                                            <option value="female">female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form row mt-3">
                                    <div className="col">
                                        <label>Price: </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="price"
                                            value={subForm.price}
                                            placeholder="Enter the price"
                                            onChange={e=>handleProductChange(e,index)}/>
                                    </div>
                                    <div className="col" style={{marginTop: "35px"}}>
                                        <input type="file"
                                               name="file"
                                               onChange={e=>handleProductChange(e,index)}/>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                    ))}
                    <div className="form row mt-3" style={{marginTop: "35px"}}>
                        <div className="col">
                    <button type="button" onClick={handleAddSubForm} className="btn btn-dark mt-3">
                        <FontAwesomeIcon className="mr-2" icon={faPlusSquare}/>Add Product
                    </button>
                        </div>
                        <div className="col">
                    <button type="button" onClick={onFormSubmit} className="btn btn-primary mt-3">
                        <FontAwesomeIcon className="mr-2" icon={faPlusSquare}/>Create Auction
                    </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddAuction;
