import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import MessageBox from '../components/MessageBox';
// import { ORDER_CREATE_RESET } from '../types';
import LoadingBox from '../components/LoadingBox';

import Layout from '../components/Layout';
import { urlApi } from "../slice/url";
import { userSelector } from '../slice/userSlice'
import axios from 'axios';

function OrderDetail(props) {
  const orderId = props.match.params.id;

  // const cart = useSelector((state) => state.cart);
  // const { cartItems, shippingAddress, paymentMethod } = cart;

  // const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  // const shippingPrice = itemsPrice > 100 ? 0 : 10;
  // const taxPrice = Math.round(0.1 * itemsPrice * 100) / 100;
  // const totalPrice = itemsPrice + shippingPrice + taxPrice;
  // const orderDetails = useSelector((state) => state.orderDetails);
  // const { loading, order, error } = orderDetails;
  // const { shippingAddress, orderItems } = order;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState({ shippingAddress: {}, orderItems: [] });

  const { userInfo } = useSelector(userSelector);

  const [loadingDeliver, setLoadingDeliver] = useState(false)
  const [errorDeliver, setErrorDeliver] = useState('')
  const [successDeliver, setSuccessDeliver] = useState(false)
  // check user login or not
  if (!userInfo) {
    props.history.push('/signin');
  }

  useEffect(() => {

    const fetchOrder = async () => {
      setLoading(true);
      try {
        console.log('im here');
        setError('');
        const { data } = await axios.get(`${urlApi}orders/${orderId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        setOrder(data);
      } catch (error) {
        const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        setError(message);
      }
      setLoading(false);
    };

    fetchOrder();

  }, [orderId, successDeliver]);


  const deliverOrder = async (orderId) => {
    setLoadingDeliver(true);
    try {
      setErrorDeliver('');
      const res = await axios.put(
        `${urlApi}orders/${orderId}/deliver`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      )
      console.log(res);
      if (res) {
        console.log('i');
        setSuccessDeliver(true);
      }
    } catch (error) {
      const message = error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      //console.log(err)
      setErrorDeliver(message);
    }
    setLoadingDeliver(false);

  }

  const deliverHandler = () => {
    deliverOrder(order._id);
  };
  // console.log('order', order)
  return (
    <Layout page="profile" >
      <div className="wrap-form">
        {loading ? (<LoadingBox></LoadingBox>)
          : error ? (<MessageBox variant="danger">{error}</MessageBox>)
            : (
              <div>
                <h1>Order number : {order._id}</h1>
                <div className="row top">
                  <div className="col-2">
                    <ul>
                      {order && (
                        <li className="card card-body">

                          <h3>Shipping </h3>
                          <p>
                            <strong>Address: </strong>
                            {order && order.shippingAddress.address}
                      , {order.shippingAddress.city}
                      , {order.shippingAddress.postalCode},{' '}
                            {order.shippingAddress.country},
                    </p>
                          {
                            order.isDelivered ?
                              <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
                              :
                              <MessageBox variant="danger">Not Delivered</MessageBox>
                          }
                        </li>
                      )}
                      <li className="card card-body">
                        <h3>Payment</h3>
                        <p>
                          <strong>Method: </strong>
                          {order.paymentMethod}
                        </p>
                        {
                          order.isPaid ?
                            <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                            :
                            <MessageBox variant="danger">Not Paid</MessageBox>
                        }
                      </li>
                      <li className="card card-body">
                        <h3>Order Items</h3>
                        {order.orderItems.length === 0 ? (
                          <MessageBox>Cart is empty</MessageBox>
                        ) : (
                            <ul>
                              {order.orderItems.map((item) => (
                                <li key={item.product}>
                                  <div className="row">
                                    <div>
                                      <img
                                        className="small"
                                        src={item.image}
                                        alt={item.name}
                                      />
                                    </div>
                                    <div className="min-30">
                                      <Link to={`/product/${item.product}`}>
                                        {item.name}
                                      </Link>
                                    </div>
                                    <div md={4} className="text-right">
                                      {item.qty} x ${item.price} = ${item.qty * item.price}
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                      </li>
                    </ul>
                  </div>
                  <div className="col-1">
                    <div className="card card-body">
                      <ul>
                        <li>
                          <h3>Order Summary</h3>
                        </li>
                        <li>
                          <div className="row">
                            <div>Items Price</div>
                            <div>${order.itemsPrice}</div>
                          </div>
                        </li>
                        <li>
                          <div className="row">
                            <div>Shipping Price</div>
                            <div>${order.shippingPrice}</div>
                          </div>
                        </li>
                        <li>
                          <div className="row">
                            <div>Tax (10%)</div>
                            <div>${order.taxPrice}</div>
                          </div>
                        </li>
                        <li>
                          <div className="row">
                            <div>
                              <strong>Order Total</strong>
                            </div>
                            <div>
                              <strong>${order.totalPrice}</strong>
                            </div>
                          </div>
                        </li>


                        {userInfo && userInfo.isAdmin && !order.isDelivered && (
                          <li>
                            {loadingDeliver && <LoadingBox></LoadingBox>}
                            {errorDeliver && (
                              <MessageBox variant="danger">{errorDeliver}</MessageBox>
                            )}
                            <button
                              type="button"
                              className="primary block"
                              onClick={deliverHandler}
                            >
                              Deliver Order
                  </button>
                          </li>
                        )}

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
        }
      </div>
    </Layout>)
}

export default OrderDetail;
// http://localhost:3005/order/5fb474a552de4b0c2c0417cc no image
// http://localhost:3005/order/5fb477b424b1a0446ce74fc7