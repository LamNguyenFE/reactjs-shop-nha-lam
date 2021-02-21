import React from 'react'
import Slider from 'react-slick';

import BannerNextArrow from './BannerNextArrow';
import BannerPreArrow from './BannerPreArrow';

function Banner() {
    var settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <BannerNextArrow />,
        prevArrow: <BannerPreArrow />,

    };
    return (
        <div className="banner">
            <div className="container banner__inner">
                <div className="banner__center">
                    <div className="border-2px-brown slider box">
                        <div className="owl-carousel " id="slider_banner">
                            <Slider {...settings}>
                                <img className="banner__center-image" src="/images/banner-1.png" alt="Some thing diffrent" loading="lazy" />
                                <img className="banner__center-image" src="/images/banner-1.png" alt="Some thing diffrent" loading="lazy" />
                                <img className="banner__center-image" src="/images/banner-1.png" alt="Some thing diffrent" loading="lazy" />
                                <img className="banner__center-image" src="/images/banner-1.png" alt="Some thing diffrent" loading="lazy" />
                            </Slider>
                        </div>
                        {/* <!-- <div className="border90 ribbon border-1px-brown r13"></div> -->
          <!-- <div className="border90 ribbon border-1px-brown l13"></div> --> */}
                        <div className="ribbon ribbon-top-left"><img src="/images/top-left.png" alt="Some thing diffrent" /></div>
                        <div className="ribbon ribbon-bottom-right"><img src="/images/bottom-right.png" alt="Some thing diffrent" /></div>
                        {/* <!-- <div className="ribbon ribbon-center-right r13"><img src="/images/center-right-image.png" alt="Some thing diffrent" /></div> -->
          <!-- <div className="ribbon ribbon-center-left l13"><img src="/images/center-left-image.png" alt="Some thing diffrent" /></div> --> */}


                    </div>
                </div>

                <div className="banner__right">
                    <a href="#"><img className="border-2px-brown" src="/images/banner-small-1.png" alt="Some thing diffrent" /></a>
                    <a href="#"><img className="border-2px-brown" src="/images/banner-small-2.png" alt="Some thing diffrent" /></a>
                </div>
            </div>
        </div>
    )
}

export default Banner
