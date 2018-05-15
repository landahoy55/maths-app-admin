//Same API as route
//Pass props as routes
//But only show if authenticated

import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenticationTracking from '../AuthenticationTracking';

let authTracking = AuthenticationTracking.getInstance();

const PrivateRoute = ({ component: Component, ...rest }) => (
    
    <Route {...rest} render={(props) => (
        
        authTracking.getAuthStatus() === true
          ? <Component {...props} />
          : <Redirect to='/signin' />
      )} />
);

export default PrivateRoute;
