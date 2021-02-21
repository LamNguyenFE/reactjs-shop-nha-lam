import React, { Component } from "react";
import Slider from "react-slick";
import Product from "./Product";
import './SimpleSlider.scss';

export default class SimpleSlider extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1368,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        // infinite: true,
                        // dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                }

            ]
        };
        return (
            <div>
                <h2> Responsive </h2>
                <Slider {...settings}>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>
                    <div>
                        <Product />
                    </div>

                </Slider>
            </div>
        );
    }
}