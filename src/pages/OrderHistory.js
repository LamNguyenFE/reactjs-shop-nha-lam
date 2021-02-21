import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import Menu from '../components/Menu';

import { urlApi } from "../slice/url";
import { userSelector } from '../slice/userSlice'
import { useState } from 'react';
import axios from 'axios';

function OrderHistory(props) {


    //1
    const { userInfo } = useSelector(userSelector);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [orders, setOrders] = useState([]);
    // check user login or not
    if (!userInfo) {
        props.history.push('/signin');
    }

    //2

    useEffect(() => {

        const fetchOrders = async () => {
            setLoading(true);
            try {
                setError('');
                const { data } = await axios.get(urlApi + 'orders/mine', {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                setOrders(data);
            } catch (error) {
                const message = error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
                setError(message);
            }
            setLoading(false);
        };
        fetchOrders();
    }, []);

    return (
        <>
            <Menu show={true} />
            <div className="order-history-page">
                <div className="container">
                    <h1>Order History</h1>
                    {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : orders.length === 0 ? (
                        <MessageBox variant="info">No Order Found</MessageBox>
                    ) : (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>DATE</th>
                                                <th>TOTAL</th>
                                                <th>PAID</th>
                                                <th>ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>{order.createdAt.substring(0, 10)}</td>
                                                    <td>{order.totalPrice}</td>
                                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                props.history.push(`/order/${order._id}`);
                                                            }}
                                                            className="small"
                                                        >
                                                            Details
                  </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                </div>
            </div>

        </>
    );
}

export default OrderHistory;
