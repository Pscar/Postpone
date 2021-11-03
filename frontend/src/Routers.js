import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { StoreContext } from './Context/Store';

import PrivateRoute from './PrivateRoute';
import Navbar from './pages/navbar';
import loginsForm from './pages/loginsForm';

//doctor
import doctorSchedule from './pages/doctor/doctorSchedule';

//Admin
import adminPage from './pages/admin/adminPage';
import formChangeDate from './pages/admin/formChangeDate';
import formChangeDr from './pages/admin/formChangeDr';
import formOriginal from './pages/admin/formOriginal';

//user
import userPostPoneDetail from './pages/user/userPostPoneDetail';
import userRegister from './pages/user/userRegister';
import userPostPone from './pages/user/userPostPone';


export default function Routers() {
  const { dataUserNow } = React.useContext(StoreContext);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={userRegister} />
        <Route path="/login" component={loginsForm} />
        <Route path="/doctor" component={doctorSchedule} />

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
