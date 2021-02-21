import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LoadingBox from '../components/LoadingBox';
import Menu from '../components/Menu';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

import { urlApi } from "../slice/url";
import { userSelector } from '../slice/userSlice'

export default function ProductDetail(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [product, setProduct] = useState({});

    const [loadingReviewCreate, setLoadingReviewCreate] = useState(false);
    const [errorReviewCreate, setErrorReviewCreate] = useState('');
    const [successReviewCreate, setSuccessReviewCreate] = useState(false);


    // const productDetails = useSelector((state) => state.productDetails);
    // const { loading, error, product } = productDetails;

    const { userInfo } = useSelector(userSelector);

    // const productReviewCreate = useSelector((state) => state.productReviewCreate);
    // const {
    //     loading: loadingReviewCreate,
    //     error: errorReviewCreate,
    //     success: successReviewCreate,
    // } = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');


    // useEffect(() => {
    //     // if (successReviewCreate) {
    //     //     window.alert('Review Submitted Successfully');
    //     //     setRating('');
    //     //     setComment('');
    //     //     dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    //     // }
    //     // dispatch(detailsProduct(productId));
    // }, [dispatch, productId,

    //     // successReviewCreate
    // ]);

    useEffect(() => {



        const fetchProduct = async () => {
            setLoading(true);
            try {
                setError('');
                const { data } = await axios.get(urlApi + "products/" + productId);
                setProduct(data);
                document.title = 'Shop Nhà Làm : ' + data.name
            } catch (error) {
                const message = error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
                setError(message);
            }
            setLoading(false);
        };
        fetchProduct();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


    }, [productId, successReviewCreate]);

    const createReview = async (productId, review) => {
        setLoadingReviewCreate(true);
        try {
            setErrorReviewCreate('');
            const { data } = await axios.post(
                `${urlApi}products/${productId}/reviews`,
                review,
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            )
            console.log(data);
            if (data) {
                setSuccessReviewCreate(true);
            }
        } catch (error) {
            const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            //console.log(err)
            setErrorReviewCreate(message);
        }
        setLoadingReviewCreate(false);

    }

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };

    const backButton = () => {
        props.history.goBack()
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
            createReview(productId, { rating, comment, name: userInfo.name })

        } else {
            alert('Please enter comment and rating');
        }
    };
    return (
        <>
            <Menu show={true} />
            <div className="product-detail-page">
                <div className="container">
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <div>
                                    <button className="back-btn btn"
                                        onClick={backButton}
                                    >Quay lại</button>
                                    <div className="row top bg">
                                        <div className="col-2">
                                            <img
                                                className="large"
                                                src={product.image}
                                                alt={product.name}
                                            ></img>
                                        </div>
                                        <div className="col-2 ">
                                            <div className="card card-body product-detail">
                                                <ul>
                                                    <li>
                                                        <h1>{product.name}</h1>
                                                    </li>
                                                    <li>
                                                        <Rating
                                                            rating={product.rating}
                                                            numReviews={product.numReviews}
                                                        ></Rating>
                                                    </li>
                                                    <li>Giá : ${product.price}</li>
                                                    <li>

                                                        <p>{product.description}</p>
                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={addToCartHandler}
                                                            className="primary block"
                                                        >
                                                            Mua hàng
                                                            </button>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="reviews bg">
                                        <div className="card card-body">

                                            <h3 className="reviews__header">Nhận xét</h3>
                                            {/* {console.log(product.reviews?.length)} */}
                                            {!product.reviews?.length && (
                                                <MessageBox>
                                                    Chưa có nhận xét
                                                </MessageBox>
                                            )}
                                            <ul>
                                                {product.reviews && product.reviews.map((review) => (
                                                    <li key={review._id}>
                                                        <strong>{review.name}</strong>
                                                        <Rating rating={review.rating} caption=" "></Rating>
                                                        <p>{review.createdAt.substring(0, 10)}</p>
                                                        <p>{review.comment}</p>
                                                    </li>
                                                ))}
                                                <li>
                                                    {userInfo ? (
                                                        <form className="form" onSubmit={submitHandler}>
                                                            <div>
                                                                <h2>Viết nhận xét</h2>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="rating">Đánh giá</label>
                                                                <select
                                                                    id="rating"
                                                                    value={rating}
                                                                    onChange={(e) => setRating(e.target.value)}
                                                                >
                                                                    <option value="">Chọn...</option>
                                                                    <option value="1">1*</option>
                                                                    <option value="2">2*</option>
                                                                    <option value="3">3*</option>
                                                                    <option value="4">4*</option>
                                                                    <option value="5">5*</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="comment">Nhận xét</label>
                                                                <textarea
                                                                    id="comment"
                                                                    value={comment}
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                    className="textinput"
                                                                ></textarea>
                                                            </div>
                                                            <div>
                                                                <label />
                                                                <button className="primary" type="submit">
                                                                    Gửi
                      </button>
                                                            </div>
                                                            <div>
                                                                {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                                                {errorReviewCreate && (
                                                                    <MessageBox variant="danger">
                                                                        {errorReviewCreate}
                                                                    </MessageBox>
                                                                )}
                                                            </div>
                                                        </form>
                                                    ) : (
                                                            <MessageBox>
                                                                <Link className="link-btn" to="/signin">Đăng nhập</Link>
                                                            </MessageBox>
                                                        )}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                </div>
            </div>
        </>
    );
}