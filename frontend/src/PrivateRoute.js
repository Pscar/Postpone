import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export default function PrivateRoute({ users, component: Component, ...path }) {
  
  if (users != null) {
    return (
      <Route {...path} render={props => users.email ? <Component {...props} users={users} /> : ""} />
    )
  } else {
    return (
      <Redirect to="login" />
    )
  }

}

