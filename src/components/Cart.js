import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";
import Fade from "react-reveal/Fade";
import formatCurrency from "../util";
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

export const Cart = (props) => {
    // console.log('cart props', props)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const [showCheckout, setShowCheckout] = useState(false);

    const { cartItems, order } = props;

    const handleCreateOrder = (event) => {
        event.preventDefault();
        const order = {
            name: name,
            email: email,
            address: address,
            cartItems: cartItems,
            total: cartItems.reduce((a, c) => a + c.price * c.count, 0),
        };

        props.createOrder(order);
    }

    const closeModal = () => {
        //set order in redux to null
        props.clearOrder();
        setName("");
        setEmail("");
        setAddress("");
        setShowCheckout(false);
    }


    return (
        <div>
            {/* {console.log('cartItems', cartItems)} */}
            {!cartItems || cartItems.length === 0 ? (
                <div className="cart cart-header">Cart is empty</div>
            ) : (
                    <div className="cart cart-header">
                        You have {cartItems.length} in the cart{" "}
                    </div>
                )}
            {
                props.order && <Modal style={customStyles} isOpen={true} onRequestClose={closeModal} ariaHideApp={false}>
                    {/* <Zoom> */}
                    <button className="close-modal" onClick={closeModal}>
                        x
                    </button>

                    <div className="order-details">
                        <h3 className="success-message">Your order has been completed</h3>
                        <h2>Order number {order._id}</h2>
                        <ul>
                            <li>
                                <div>Name:</div>
                                <div>{order.name}</div>
                            </li>
                            <li>
                                <div>Email:</div>
                                <div>{order.email}</div>
                            </li>
                            <li>
                                <div>Address:</div>
                                <div>{order.address}</div>
                            </li>
                            <li>
                                <div>Total:</div>
                                <div>{order.a}</div>
                            </li>
                            <li>
                                <div>Cart Items:</div>
                                <div>{order.cartItems.map(x => (
                                    <div>
                                        {x.count} x {x.title} - {x.price}
                                    </div>

                                ))}
                                </div>
                            </li>

                        </ul>
                    </div>

                </Modal>
            }

            <div className="cart">
                <Fade left cascade>

                    <ul className="cart-items">
                        {cartItems && cartItems.map((item) => (
                            <li key={item._id}>
                                <div className="cart-product-image">
                                    <img src={item.image} alt={item.title}></img>
                                </div>
                                <div className="cart-product-info">
                                    <div className="cart-title">{item.title}</div>
                                    <div className="right">
                                        {formatCurrency(item.price)} x {item.count}{" "}
                                        <button
                                            className="button"
                                            onClick={() => props.removeFromCart(item)}
                                        >
                                            Remove
                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Fade>
            </div>

            {cartItems.length !== 0 && (
                <div>
                    <div className="cart">
                        <div className="total">
                            <div>
                                Total:{" "}
                                {formatCurrency(
                                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                )}
                            </div>
                            <button
                                onClick={() => {
                                    setShowCheckout({ showCheckout: true });
                                }}
                                className="button primary"
                            >
                                Proceed Checkout
                            </button>
                        </div>
                    </div>
                    {showCheckout && (
                        <Fade down cascade>
                            <div className="cart">
                                <form
                                    onSubmit={handleCreateOrder}
                                >
                                    <ul className="form-container">
                                        <li>
                                            <label>Email</label>
                                            <input
                                                name="email"
                                                type="email"
                                                required
                                                onChange={e => setEmail(e.target.value)}
                                            ></input>
                                        </li>
                                        <li>
                                            <label>Name</label>
                                            <input
                                                name="name"
                                                type="text"
                                                required
                                                onChange={e => setName(e.target.value)}
                                            ></input>
                                        </li>
                                        <li>
                                            <label>Address</label>
                                            <input
                                                name="address"
                                                type="text"
                                                required
                                                onChange={e => setAddress(e.target.value)}
                                            ></input>
                                        </li>
                                        <li>
                                            <button className="button primary" type="submit">
                                                Checkout
                          </button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </Fade>
                    )}
                </div>
            )}

        </div>
    )
}


export default connect(
    (state) => ({
        order: state.order.order,
        cartItems: state.cart.cartItems,
    }),
    {
        removeFromCart,
        createOrder,
        clearOrder
    }
)(Cart);
