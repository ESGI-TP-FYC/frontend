import React, {FC} from 'react';
import Carousel from "react-bootstrap/Carousel";
import {Link} from "react-router-dom";
import "./CarouselImageSlider.css";
const sliderItems = [
    {
        id: "1",
        name: "Photo 1",
        url: "https://i.ebayimg.com/images/g/L1gAAOSwRTZhfB~D/s-l500.png"
    },
    {
        id: "2",
        name: "Photo 2",
        url: "https://i.ebayimg.com/images/g/2VYAAOSwRGBgdWNk/s-l500.jpg"
    },
    {
        id: "3",
        name: "Photo 3",
        url: "https://i.ebayimg.com/images/g/hfwAAOSwbFtc8OLp/s-l500.png"
    },
];

const CarouselImageSlider: FC = () => {
    const settings = {
        indicators: false,
        fade: true,
        infinite: true,
        interval: 3000
    }

    return (
        <div>
            <Carousel {...settings}>
                {sliderItems.map((item, index) => {
                    return (
                        <Carousel.Item key={item.id}>
                            <Link to={`/product/${item.id}`}>
                                <img className="d-block w-100" src={item.url} alt={item.name}/>
                            </Link>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>
    );
}

export default CarouselImageSlider;
