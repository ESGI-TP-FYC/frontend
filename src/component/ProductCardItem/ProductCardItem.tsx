import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import {Product} from "../../types/types";
import StarRating from "../StarRating/StarRating";

type PropsType = {
    key: number
    product: Product
    colSize: number
    link: string
    btnName: string
};

const ProductCardItem: FC<PropsType> = ({key, product, colSize, link, btnName}) => {
    return (
        <div key={key} className={`col-lg-${colSize}`}>
            <div className="card mb-5" style={{height: "320px"}}>
                <div style={{height: "92px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <LazyLoadImage
                        effect="blur"
                        style={{width: "120px", marginTop: "20px"}}
                        src={`data:image/jpeg;base64,${product.file}`}/>
                </div>
                <div className="card-body text-center">
                    <StarRating productRating={product.productRating}/>
                    <h6>{product.productTitle}</h6>
                    <h6>{product.productr}</h6>
                    <h6><span>${product.price}</span>.00</h6>
                </div>
                <div className="text-center align-items-end mb-3">
                    <Link to={`${link}/${product.id}`}>
                        <span className="btn btn-dark">{btnName}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCardItem;
