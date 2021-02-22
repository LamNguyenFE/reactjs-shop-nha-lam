import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product(props) {
    const { product } = props;

    return (
        <>
            { product ? product && (
                <div key={product._id} className="products__product border-2px-brown item">
                    <Link to={`/product/${product._id}`}>
                        <img className="product__image" src={product.image} alt="Some thing diffrent" />
                    </Link>
                    <div className="product_info">
                        <Link className="product__title" to={`/product/${product._id}`}> {product.name} </Link>
                        <div className="prices">
                            <div className="price">{product.fakePrice ? `$${product.fakePrice}` : ''}</div>
                            <div className="discount-price">${product.price}</div>
                        </div>

                        <Rating rating={product.rating} numReviews={product.numReviews} />
                    </div>
                </div>
            ) : (
                    <div className="products__product border-2px-brown item">
                        <a>
                            <img className="product__image" src="/images/banner-freeship.png" alt="Some thing diffrent" />
                        </a>
                        <div className="product_info">
                            <a href="#" className="product__title">Some thing </a>
                            <div className="prices">
                                <div className="price">3.000.000đ</div>
                                <div className="discount-price">2.300.000đ</div>
                            </div>
                            <div className="rate">
                                <div className="star">
                                    <span className="fa fa-star "></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>

                                </div>
                                <div className="rate-count">(32 đánh giá)</div>
                            </div>
                        </div>
                    </div>

                )}
        </>
    )
}

export default Product
