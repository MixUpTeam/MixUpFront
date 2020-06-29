import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { message } from 'antd';

import { useSelector } from 'react-redux';

const AuthRoute = ({ component: Component, ...rest }) => {
  const logStatus = useSelector((state) => state.log.user_connected);

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          logStatus ? (
            <Component {...props} />
          ) : (
            <div>
              <Redirect to={{ pathname: '/sign_in' }} />
              {message.warning('Please sign in to continue.', 3)}
            </div>
          )
        }
      />
    </>
  );
};

export default AuthRoute;
