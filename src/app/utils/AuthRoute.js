import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useSelector((state) => state.loginReducer);
  return (
    <Route
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  );
};

AuthRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default AuthRoute;
