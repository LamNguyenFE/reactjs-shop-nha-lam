import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listProductsAsync, productSelector } from '../slice/productSlice'
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import { Link, useParams } from 'react-router-dom';

import Menu from '../components/Menu';
import Rating from 'components/Rating';
import { categorySelector, getProductCategoryList } from 'slice/categorySlice';

export const prices = [
    {
        name: 'Any',
        min: 0,
        max: 0,
    },
    {
        name: `$1 to $10`,
        min: 1,
        max: 10,
    },
    {
        name: `$10 to $100`,
        min: 10,
        max: 100,
    },
    {
        name: `$100 to $1000`,
        min: 100,
        max: 1000,
    },
];
export const ratings = [
    {
        name: '1stars & up',
        rating: 1,
    },
    {
        name: '2stars & up',
        rating: 2,
    },
    {
        name: '3stars & up',
        rating: 3,
    },

    {
        name: '4stars & up',
        rating: 4,
    },






];



function Search(props) {
    const {
        name = 'all',
        category = 'all',
        min = 0,
        max = 0,
        rating = 0,
        order = 'newest',
        pageNumber = 1,
    } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector(productSelector);
    const { loading, error, products, page, pages } = productList;

    //------------------
    const productCategoryList = useSelector(categorySelector);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = productCategoryList;
    //------------------

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        document.title = 'Category ' + category
        dispatch(getProductCategoryList())

        dispatch(
            listProductsAsync({
                pageNumber,
                name: name !== 'all' ? name : '',
                category: category !== 'all' ? category : '',
                min,
                max,
                rating,
                order,
            })
        );
    }, [category, dispatch, max, min, name, order, rating, pageNumber]);

    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        const filterPage = filter.page || pageNumber;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/page/${filterPage}`;
    };


    return (
        <>
            <Menu show={true} />


            <div className="category-page" style={{ marginTop: '10px' }}>


                <div className="container category-title">
                    <div className="category-name">
                        <a href="#"><img src="/images/do-thu-cong-icon.png" />Kết quả tìm kiếm</a>
                    </div>
                    <div className="load-more"></div>
                </div>





                <div className="container">
                    <div className="filter">



                        <div className="filter_item">
                            <h3>Category</h3>
                            <div>
                                {loadingCategories ? (
                                    <LoadingBox></LoadingBox>
                                ) : errorCategories ? (
                                    <MessageBox variant="danger">{errorCategories}</MessageBox>
                                ) : (
                                            <ul>
                                                <li>
                                                    <Link
                                                        className={'all' === category ? 'active' : ''}
                                                        to={getFilterUrl({ category: 'all' })}
                                                    >
                                                        Any
                                                </Link>
                                                </li>
                                                {categories && categories.map((c) => (
                                                    <li key={c}>
                                                        <Link
                                                            className={c === category ? 'active' : ''}
                                                            to={getFilterUrl({ category: c })}
                                                        >
                                                            {c}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                            </div>
                        </div>
                        <div className="filter_item">

                            <div>
                                <h3>Price</h3>
                                <ul>
                                    {prices.map((p) => (
                                        <li key={p.name}>
                                            <Link
                                                to={getFilterUrl({ min: p.min, max: p.max })}
                                                className={
                                                    `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                                                }
                                            >
                                                {p.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                        <div className="filter_item">
                            <div>
                                <h3>Review</h3>
                                <ul>
                                    <li>
                                        <Link
                                            className={'all' === rating ? 'active' : ''}
                                            to={getFilterUrl({ rating: 'all' })}
                                        >
                                            Any
                                                </Link>
                                    </li>

                                    {ratings.map((r) => (
                                        <li key={r.name}>
                                            <Link
                                                to={getFilterUrl({ rating: r.rating })}
                                                className={`${r.rating}` === `${rating}` ? 'active' : ''}
                                            >
                                                <Rating caption={''} rating={r.rating}></Rating>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="filter_item">
                            {loading ? (
                                <LoadingBox></LoadingBox>
                            ) : error ? (
                                <MessageBox variant="danger">{error}</MessageBox>
                            ) : ''}

                            <div>
                                <h3>Sort by{' '}</h3>
                                <select
                                    value={order}
                                    onChange={(e) => {
                                        props.history.push(getFilterUrl({ order: e.target.value }));
                                    }}
                                >
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="lowest">Price: Low to High</option>
                                    <option value="highest">Price: High to Low</option>
                                    <option value="toprated">Avg. Customer Reviews</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>



                <div className="container">
                    <div className="category-page__inner">



                        {loading ? (
                            <LoadingBox></LoadingBox>
                        ) : error ? (
                            <MessageBox variant="danger">{error}</MessageBox>
                        ) : (
                                    <>
                                        {products.length === 0 && (
                                            <MessageBox>No Product Found</MessageBox>
                                        )}


                                        {products.map((product) => (
                                            <Product key={product._id} product={product}></Product>
                                        ))}
                                    </>
                                )}
                    </div>
                    <div className="row center pagination">
                        {[...Array(pages).keys()].map((x) => (
                            <Link
                                className={x + 1 === page ? 'active' : ''}
                                key={x + 1}
                                to={getFilterUrl({ page: x + 1 })}
                            >
                                {x + 1}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>



        </>
    )
}

export default Search
