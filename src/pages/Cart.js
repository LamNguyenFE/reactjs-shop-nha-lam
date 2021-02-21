import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
// import { addToCart, removeFromCart, savePaymentMethod, saveShippingAddress } from '../actions/cartActions';
// import { createOrder } from '../actions/orderActions';
import Menu from '../components/Menu';
import { ORDER_CREATE_RESET } from '../types';
import { addToCart, cartSelector, removeFromCart, clearCart } from '../slice/cartSlice'
import { userSelector } from '../slice/userSlice'
import { urlApi } from "../slice/url";
import axios from 'axios';

function Cart(props) {

    // console.log(props)

    const { cartItems } = useSelector(cartSelector);

    const { shippingAddress } = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}

    const paymentMethodSaved = localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : "COD"

    const productId = props.match.params.id;
    //truyen qty qua url 
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;

    const { userInfo } = useSelector(userSelector);
    // const history = useHistory();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId))

    }
    document.title = 'Shop Nhà Làm : Cart'

    const backHandler = () => {
        // history.goBack();
        props.history.goBack();
    }

    // check user login or not
    if (!userInfo) {
        props.history.push('/signin');
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addToCart([productId, qty]));
        }

    }, [dispatch, productId, qty]);


    const [fullName, setFullName] = useState(shippingAddress.fullName)

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)



    const [paymentMethod, setPaymentMethod] = useState(paymentMethodSaved)

    // const orderCreate = useSelector((state) => state.orderCreate);
    // const { loading, success, order, error } = orderCreate;




    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Math.round(0.1 * itemsPrice * 100) / 100;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;



    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [order, setOrder] = useState({});

    const createOrder = async (order) => {
        setLoading(true);
        try {
            setError('');

            const { data, message } = await axios.post(urlApi + 'orders', order, {
                headers: {
                    Authorization: ` Bearer ${userInfo.token}`,
                },
            });




            // console.log(data);
            if (data) {
                //og my god
                console.log(data.message);
                console.log(data.data);
                console.log(data.data._id);

                setOrder(data.data);

                setSuccess(true);
                // dispatch(clearCart());
                // props.history.push(`/order/${data.data._id}`);

            }
        } catch (error) {
            const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            //console.log(err)
            setError(message);
        }
        setLoading(false);

    }




    const submitHandler = (e) => {
        e.preventDefault();

        const shippingAddress = {
            address,
            fullName,
            city,
            postalCode,
            country,
        }
        //haiz
        const newCartItems = cartItems.map(x => {
            const y = { ...x }
            y.product = x._id
            return y
        })
        console.log(newCartItems);

        createOrder({
            orderItems: newCartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        })

        localStorage.setItem('shippingAddress', JSON.stringify({
            shippingAddress

        }));
        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));


    };




    useEffect(() => {
        if (success) {
            dispatch(clearCart());
            props.history.push(`/order/${order._id}`);

        }
        if (error) {
            console.log(error);

        }
    }, [success, order, error]);




    return (
        <>
            <Menu show={true} />
            <div className="khuyenmai">
                <div className="container">
                    <div className="khuyenmai__left">
                        <img src="/images/dangkykm-icon.png" className="khuyenmai__icon"></img>
                        <div className="khuyenmai__text">
                            Thông tin đơn hàng
            </div>
                    </div>
                </div>
            </div>
            <div className="cart-page">
                <div className="container">
                    <div className="cart-page__inner">
                        <div className="cart-warp">
                            <div className="wrap-form">
                                <div className="cart">
                                    <div className="cart-list">
                                        <ul className="cart-list-container">
                                            <li>
                                                <h3>Shopping Cart</h3>
                                                <div>
                                                    Price
                                            </div>
                                            </li>
                                            {
                                                cartItems.length === 0 ?
                                                    <div>Cart is Empty</div>
                                                    :
                                                    cartItems.map(item =>
                                                        <li key={item._id}>

                                                            <img className="cart-image" src={item.image} alt="product" />
                                                            <div className="cart-name">
                                                                <div><Link to={"/product/" + item._id}>{item.name}</Link></div>
                                                                <div>Qty:
                                        <select value={item.qty} onChange={e => dispatch(addToCart([item._id, e.target.value]))}>
                                                                        <option>1</option>
                                                                        <option>2</option>
                                                                        <option>3</option>
                                                                        <option>4</option>
                                                                        <option>5</option>
                                                                    </select>
                                                                    <button className="button" type="button" onClick={() => removeFromCartHandler(item._id)}>Delete</button>
                                                                </div>
                                                            </div>
                                                            <div className="cart-price">{item.price}</div>

                                                        </li>
                                                    )
                                            }
                                        </ul>
                                    </div>
                                    <div className="cart-action">
                                        <h3>Subtotal ({cartItems.reduce((a, c) => a * 1 + c.qty * 1, 0)}) items
                                 :
                             ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</h3>

                                        <button className="button primary full-width" onClick={backHandler}>Quay lại</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="address-form-warp">
                            <div className="wrap-form">
                                <form className="form" onSubmit={submitHandler}>
                                    <div>
                                        <h3>Shipping Address</h3>
                                    </div>
                                    <div>
                                        {/* <label htmlFor="fullname">Full Name</label> */}
                                        <input
                                            type="text"
                                            name="fullname"
                                            id="fullname"
                                            placeholder="Enter full name"
                                            value={fullName}
                                            required
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        {/* <label htmlFor="address">Address</label> */}
                                        <input
                                            type="text"
                                            id="address"
                                            placeholder="Enter address"
                                            required
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        {/* <label htmlFor="city">City</label> */}
                                        <input
                                            type="text"
                                            id="city"
                                            placeholder="Enter City"
                                            required
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        {/* <label htmlFor="postalCode">Postal Code</label> */}
                                        <input
                                            type="text"
                                            id="postalCode"
                                            placeholder="Enter Postal Code"
                                            required
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        {/* <label htmlFor="country">Country</label> */}
                                        <input
                                            type="text"
                                            id="country"
                                            placeholder="Enter Country"
                                            required
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <h3>Payment</h3>
                                    </div>
                                    <div>
                                        <div>
                                            <input
                                                type="radio"
                                                required
                                                id="paypal"
                                                value="paypal"
                                                name="paymentMethod"
                                                checked={paymentMethod === 'paypal'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <label htmlFor="paypal">Paypal</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <input
                                                type="radio"
                                                required
                                                id="stripe"
                                                value="stripe"
                                                name="paymentMethod"
                                                checked={paymentMethod === 'stripe'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <label htmlFor="stripe">Stripe</label>

                                        </div>
                                    </div>
                                    <div>
                                        <label />
                                        <button
                                            className="primary"
                                            type="submit"
                                            disabled={cartItems.length === 0}>
                                            Place Order
                                        </button>




                                    </div>
                                </form>
                                {error && <div>
                                    Lỗi
                                    {console.log(error)}
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart
