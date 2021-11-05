import React from 'react';
import { Route } from 'react-router-dom';


export default function PrivateRoute({ users, component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => users.email ? <Component {...props} users={users} /> : <h1>login</h1>} />
  )
}

