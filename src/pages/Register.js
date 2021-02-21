import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { register, userSelector } from '../slice/userSlice'
import { useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Menu from '../components/Menu';

function Register(props) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const { userInfo, loading, error } = useSelector(userSelector);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            alert('P and CP not match')
        }
        else {
            dispatch(register({ name, email, password }));
        }
        //

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
                        <form className="form register" onSubmit={submitHandler}>
                            <div>
                                <h1>Register</h1>
                            </div>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                            <div>
                                <label htmlFor="name">Name </label>
                                <input type="text" id="name" placeholder="Enter Name"
                                    required
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
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
                                <label htmlFor="cpassword">Confirm Password</label>
                                <input type="password" id="cpassword" placeholder="Enter password"
                                    required
                                    onChange={e => setCpassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor=""></label>
                                <button className="primary" type="submit">Register</button>
                            </div>

                            <div>
                                <label htmlFor=""></label>
                                <div> Already have an account? <Link to={`/signin?redirect=${redirect}`}> Sign in</Link></div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
