import React from 'react';
import { Route, Redirect } from 'react-router-dom';



export default function PrivateRoute(props) {
  const { dataUserNow, component: Component } = props;

  if (dataUserNow.email) {
    return (
      <Route render={props => <Component id={props.match.params.id} {...props} dataUserNow={dataUserNow} />} />
    )
  }

  else {
    return (
      <h1>login</h1>
    )
  }
}
