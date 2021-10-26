import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export default function PrivateRoute({ dataUserNow, component: Component, ...rest }) {
  console.log("🚀 ~ file: PrivateRoute.js ~ line 6 ~ PrivateRoute ~ dataUserNow", dataUserNow)
  return (
    <Route {...rest} render={props => dataUserNow.email ? <Component {...props} dataUserNow={dataUserNow} /> : <h1>login</h1>} />
  )
}

