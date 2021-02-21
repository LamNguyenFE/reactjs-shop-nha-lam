import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// Slice
import { listProductsAsync, productSelector } from '../slice/productSlice'
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import { Link, useParams } from 'react-router-dom';

import Menu from '../components/Menu';



function Category(props) {
    const {
        category = 'all',
        pageNumber = 1,
    } = useParams();

    const dispatch = useDispatch();

    const productList = useSelector(productSelector);
    // console.log(productList);

    const { loading, error, products, page, pages } = productList;


    useEffect(() => {
        // alert('im here')
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        document.title = 'Shop nhà làm : ' + category

        dispatch(
            listProductsAsync(
                {
                    pageNumber,
                    category: category !== 'all' ? category : '',

                }
            )
        );
    }, [category, dispatch, pageNumber]);





    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterPage = filter.page || pageNumber;
        return `/category/${filterCategory}/page/${filterPage}`;
    };


    return (
        <>
            <Menu show={true} />


            <div className="category-page" style={{ marginTop: '10px' }}>




                <div className="container category-title">
                    <div className="category-name">
                        <a href="/#"><img src="/images/do-thu-cong-icon.png" />{category}</a>
                    </div>
                    <div className="load-more "></div>

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

export default Category
