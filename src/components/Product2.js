import React, { useEffect, useState } from 'react'
import LoadingBox from './LoadingBox';
import axios from 'axios';

import Slider from 'react-slick';

import Product from './Product';
import ProductNextArrow from './ProductNextArrow';
import ProductPreArrow from './ProductPreArrow';
import { urlApi } from '../slice/url';
// import SimpleSlider from './SimpleSlide'

function Product2(props) {
    var settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        nextArrow: <ProductNextArrow />,
        prevArrow: <ProductPreArrow />,
        responsive: [
            {
                breakpoint: 1368,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    // dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 525,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }

        ]
    };
    const { category = 'Two' } = props;
    console.log('2scategory', category)

    const [products, setProducts] = useState([]);

    const url = `${urlApi}products?category=${category}`;
    console.log('2scategory', url)
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios(url);
                console.log('2scategory', result)
                setProducts(result.data.products);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };

        fetchData();
    }, [category]);


    return (
        <div className="product2">
            <div className="container ">

                <div className="product__inner">
                    <div className="left-banner">
                        <a href="/#"><img src="/images/banner-freeship.png" alt="Some thing diffrent" className="border-2px-gray" /></a>
                    </div>
                    <div className="owl-carousel products" id="product2_1">


                        {isLoading && (<LoadingBox></LoadingBox>)}
                        <Slider {...settings}>
                            {products && products.map((product) => (

                                <div key={product._id}>
                                    <Product product={product} ></Product>
                                </div>
                            )


                            )}

                        </Slider>


                    </div>
                </div>
            </div>
        </div >
    )
}

export default Product2
