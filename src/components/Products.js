import React, { useEffect, useState } from 'react';
import formatCurrency from "../util";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import Modal from "react-modal";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: 'calc(50vh)',
        padding: '2rem',
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

function Products({ products, fetchProducts, addToCart }) {
    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetchProducts();

    }, []);

    const openModal = (product) => {
        setProduct(product);
    }

    const closeModal = () => {
        // alert('xx');
        setProduct(null);
        console.log('product', product);
    }

    return (
        <>
            {!products ? (
                <div>Loading...</div>
            ) : (
                    <ul className="products">
                        {
                            products.map((product) => (
                                <li key={product._id}>
                                    <div className="product">
                                        <a
                                            href={"#" + product._id}
                                            onClick={() => openModal(product)}
                                        >
                                            <img src={product.image} alt={product.title}></img>
                                            <p>{product.title}</p>
                                        </a>
                                        <div className="product-price">
                                            <div>{formatCurrency(product.price)}</div>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="button primary"
                                            >
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>




                )}

            { product && (
                <Modal style={customStyles} isOpen={true} onRequestClose={closeModal} ariaHideApp={false}>
                    {/* <Zoom> */}
                    <button className="close-modal" onClick={closeModal}>
                        x
                        </button>

                    <div className="product-details">
                        <img src={product.image} alt={product.title}></img>
                        <div className="product-details-description">
                            <p>
                                <strong>{product.title}</strong>
                            </p>
                            <p>{product.description}</p>
                            <p>
                                Avaiable Sizes:{" "}
                                {product.availableSizes.map((x) => (
                                    <span key={x}>
                                        {" "}
                                        <button className="button">{x}</button>
                                    </span>
                                ))}
                            </p>
                            <div className="product-price">
                                <div>{formatCurrency(product.price)}</div>
                                <button
                                    className="button primary"
                                    onClick={() => {
                                        addToCart(product);
                                        closeModal();
                                    }}
                                >
                                    Add To Cart
                              </button>
                            </div>
                        </div>
                    </div>
                    {/* </Zoom> */}
                </Modal>
            )}


        </>
    )
}
//connect
// mapState and Dispath to props
export default connect(
    (state) => ({
        products: state.products.filteredItems

    }),
    {
        fetchProducts,
        addToCart
    }
)(Products)
