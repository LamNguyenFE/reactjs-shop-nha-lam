import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userSelector, updateUserProfile } from '../slice/userSlice'
import { detail, userDetailSelector } from 'slice/userDetailSlice';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import Layout from '../components/Layout';
// import { updateUserProfile, userUpdateProfileSelector } from 'slice/userUpdateProfileSlice';

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //0 get userInfo ( signined )
  const { userInfo, successUpdate, errorUpdate, loadingUpdate } = useSelector(userSelector);
  //1 get user ( detail)
  const { loading, error, user } = useSelector(userDetailSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    //vong lap vo tan neu de depandency la user
    //fisrt load name and email la ''

    if (!user._id) {

      dispatch(detail(userInfo))
    } else {
      setName(user.name);
      setEmail(user.email);

    }


  }, [dispatch, successUpdate, user, userInfo]);




  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(updateUserProfile({
        userId: user._id, name, email, password,

      }));
    }
  };

  return (
    <Layout page="profile" >
      <div className="wrap-form">
        <form className="form profile" onSubmit={submitHandler}>
          <div>
            <h1>User Profile</h1>
          </div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
                <>
                  {loadingUpdate && <LoadingBox></LoadingBox>}
                  {errorUpdate && (
                    <MessageBox variant="danger">{errorUpdate}</MessageBox>
                  )}
                  {successUpdate && (
                    <MessageBox variant="success">
                      Profile Updated Successfully
                    </MessageBox>
                  )}
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword">confirm Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Enter confirm password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                  </div>



                  <div>

                    <label />
                    <button className="primary" type="submit">
                      Update
                    </button>
                  </div>
                </>
              )}
        </form>
      </div>
    </Layout>
  );
}