import React, { useEffect, useState } from 'react'
import LoadingBox from './LoadingBox';
import axios from 'axios';
import Slider from 'react-slick';
import Product from './Product';
import ProductNextArrow from './ProductNextArrow';
import ProductPreArrow from './ProductPreArrow';
import { urlApi } from '../slice/url';

function Product3Left(props) {
    var settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        nextArrow: <ProductNextArrow />,
        prevArrow: <ProductPreArrow />,
        responsive: [
            {
                breakpoint: 1368,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 768,
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
        <div className="product3">
            <div className="container category-title">
                <div className="category-name">
                    <a href="/#"><img src="/images/cay-thuoc-icon.png" />CÂY THUỐC TỰ NHIÊN</a>
                </div>
                <div className="load-more"><a href="/#">Xem thêm</a></div>
            </div>

            <div className="container ">
                <div className="product__inner">

                    <div className="products box owl-carousel" id="product3_2">
                        {isLoading && (<LoadingBox></LoadingBox>)}
                        <Slider {...settings}>

                            {products && products.map((product) => (

                                <div key={product._id}>
                                    <Product product={product} ></Product>
                                </div>
                            ))
                            }



                        </Slider>
                        {/* <!-- <div className="ribbon ribbon-center-right r20"><img src="/images/center-arrow-right.png" alt="Some thing diffrent" /></div> -->
          <!-- <div className="ribbon ribbon-center-left l20"><img src="/images/center-arrow-left.png" alt="Some thing diffrent" /></div> --> */}
                    </div>

                    <div className="right-banner">
                        <a href="/#"><img src="/images/banner-small.png" alt="Some thing diffrent" className="border-2px-gray" /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product3Left
