import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Navbar from './components/Navbar';
import LoginsForm from './components/LoginsForm';
import MultiStepper from './components/StepperForm/MultiStepper';
import PostPoneShow from './components/Showdata/PostPoneShow';
import AdminForm from './components/Admin/AdminForm';

import { StoreContext } from './Context/Store';
import OriginalForm from './components/Admin/OriginalForm';
import ChangeDate from './components/Admin/ChangeDate';
import ChangeDr from './components/Admin/ChangeDr';
import Schedule from './components/Doctors/Schedule';
import PostPoneDetail from './components/Showdata/PostPoneDetail';
import PrivateRoute from './Context/PrivateRoute';

export default function Routers() {
  const { dataUserNow } = React.useContext(StoreContext);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={MultiStepper} />
        <Route path="/login" component={LoginsForm} />
        
        <PrivateRoute dataUserNow={dataUserNow} component={PostPoneShow} path="/postpone" />
        <PrivateRoute dataUserNow={dataUserNow} component={AdminForm} path="/admin" />
        <PrivateRoute dataUserNow={dataUserNow} component={PostPoneDetail} path="/detail/:id" />
        <PrivateRoute dataUserNow={dataUserNow} component={ChangeDr} path="/change_dr/:id" />
        <PrivateRoute dataUserNow={dataUserNow} component={OriginalForm} path="/original/:id" />
        <PrivateRoute dataUserNow={dataUserNow} component={ChangeDate} ath="/change_date/:id" />
      </Switch>
    </Router>
  )
}
