import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userSelector } from '../slice/userSlice'
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userInfo, signout } = useSelector(userSelector);

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={
                signout
                  ? '/signin?message=You signed out successfully.'
                  : '/signin?message=Error. Please signin to see this screen.'
              }
            />
          )
      }
    />
  );
};
export default PrivateRoute;
