import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signin, userSelector } from '../slice/userSlice'
import { useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Menu from '../components/Menu';


function SignIn(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const { userInfo, loading, error } = useSelector(userSelector)
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        //
        dispatch(signin({ email, password }));
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    return (
        <>
            <Menu show={true} />


            <div className="category-page">


                <div className="container">
                    <div className="wrap-form">
                        <form className="form sign-in" onSubmit={submitHandler}>
                            <div>
                                <h1>Sign In</h1>
                            </div>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox vartiant="danger">{error}</MessageBox>}
                            <div>
                                <label htmlFor="email">Email Adress</label>
                                <input type="email" id="email" placeholder="Enter email"
                                    required
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" placeholder="Enter password"
                                    required
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor=""></label>
                                <button className="primary" type="submit">Sign In</button>
                            </div>

                            <div>
                                <label htmlFor=""></label>
                                <div> New custormer? <Link to={`/register?redirect=${redirect}`}> Create your acoount</Link></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn
