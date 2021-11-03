import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { StoreContext } from './Context/Store';

import Navbar from './pages/navbar';

import PrivateRoute from './PrivateRoute';
import adminPage from './pages/admin/adminPage';
import formChangeDate from './pages/admin/formChangeDate';
import formChangeDr from './pages/admin/formChangeDr';
import formOriginal from './pages/admin/formOriginal';
import doctorSchedule from './components/Doctors/doctorSchedule';
import userPostPoneDetail from './components/User/userPostPoneDetail';
import userRegister from './pages/user/userRegister';
import userPostPone from './pages/user/userPostPone';
import loginsForm from './pages/loginsForm';

export default function Routers() {
  const { dataUserNow } = React.useContext(StoreContext);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={userRegister} />
        <Route path="/login" component={loginsForm} />
        <Route path="/sc" component={doctorSchedule} />

        <PrivateRoute path="/postpone" dataUserNow={dataUserNow} component={userPostPone} />
        <PrivateRoute path="/admin" dataUserNow={dataUserNow} component={adminPage} />
        <PrivateRoute path="/detail/:id" dataUserNow={dataUserNow} component={userPostPoneDetail} />
        <PrivateRoute path="/change_dr/:id" dataUserNow={dataUserNow} component={formChangeDr} />
        <PrivateRoute path="/original/:id" dataUserNow={dataUserNow} component={formOriginal} />
        <PrivateRoute path="/change_date/:id" dataUserNow={dataUserNow} component={formChangeDate} />
      </Switch>
    </Router>
  )
}
