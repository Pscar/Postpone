import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import PrivateRoute from './PrivateRoute';
import Navbar from './pages/Navbar';
import loginsForm from './pages/LoginsForm';
import resgiterForm from './pages/ResgiterForm';
//doctor
import doctorSchedule from './pages/doctor/doctorSchedule';

//Admin
import adminPage from './pages/admin/adminPage';
import formChangeDate from './pages/admin/formChangeDate';
import formChangeDr from './pages/admin/formChangeDr';
import formOriginal from './pages/admin/formOriginal';
//user
import userAppointmentDetail from './pages/user/userAppointmentDetail';
import userRegister from './pages/user/userRegister';
import userAppointment from './pages/user/userAppointment';
import { useSelector } from 'react-redux';


export default function Routers() {
  const logins = useSelector((state) => state.logins.login);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={loginsForm} />
        <Route path="/register" component={resgiterForm} />

        <PrivateRoute path="/doctor" users={logins} component={doctorSchedule} />
        <PrivateRoute path="/appointment" users={logins} component={userAppointment} />
        <PrivateRoute path="/create" users={logins} component={userRegister} />
        <PrivateRoute path="/admin" users={logins} component={adminPage} />
        <PrivateRoute path="/detail/:id" users={logins} component={userAppointmentDetail} />
        <PrivateRoute path="/change_dr/:id" users={logins} component={formChangeDr} />
        <PrivateRoute path="/original/:id" users={logins} component={formOriginal} />
        <PrivateRoute path="/change_date/:id" users={logins} component={formChangeDate} />
      </Switch>
    </Router>
  )
}
