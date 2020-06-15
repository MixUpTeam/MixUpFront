import React from 'react';
import { Route } from 'react-router-dom';

import { useSelector } from 'react-redux';

const AuthRoute = ({ component: Component, ...rest }: AuthRoute) => {
  const logStatus = useSelector((state) => state.log.log);

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          logStatus ? (
            <Component {...props} />
          ) : (
            <p>This is a private page, go log in please.</p>
          )
        }
      />
    </>
  );
};

export default AuthRoute;
