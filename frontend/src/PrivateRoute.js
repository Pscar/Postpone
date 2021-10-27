import React from 'react';
import { Route } from 'react-router-dom';


export default function PrivateRoute({ dataUserNow, component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => dataUserNow.email ? <Component {...props} dataUserNow={dataUserNow} /> : <h1>login</h1>} />
  )
}

