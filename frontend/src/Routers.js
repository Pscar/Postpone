import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Navbar from './pages/Navbar';
import LoginsForm from './pages/LoginsForm';
import MultiStepper from './pages/MultiStepper';
import PostPoneShow from './pages/PostPoneShow';

import AdminForm from './components/Admin/AdminForm';

import { StoreContext } from './Context/Store';
import OriginalForm from './components/Admin/OriginalForm';
import ChangeDate from './components/Admin/ChangeDate';
import ChangeDr from './components/Admin/ChangeDr';
import Schedule from './components/Doctors/Schedule';
import PostPoneDetail from './components/Showdata/PostPoneDetail';
import PrivateRoute from './PrivateRoute';

export default function Routers() {
  const { dataUserNow } = React.useContext(StoreContext);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={MultiStepper} />
        <Route path="/login" component={LoginsForm} />

        <PrivateRoute path="/postpone" dataUserNow={dataUserNow} component={PostPoneShow} />
        <PrivateRoute path="/admin" dataUserNow={dataUserNow} component={AdminForm} />
        <PrivateRoute path="/detail/:id" dataUserNow={dataUserNow} component={PostPoneDetail} />
        <PrivateRoute path="/change_dr/:id" dataUserNow={dataUserNow} component={ChangeDr} />
        <PrivateRoute path="/original/:id" dataUserNow={dataUserNow} component={OriginalForm} />
        <PrivateRoute path="/change_date/:id" dataUserNow={dataUserNow} component={ChangeDate} />
      </Switch>
    </Router>
  )
}
