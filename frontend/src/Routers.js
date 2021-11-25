import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import PrivateRoute from './PrivateRoute';
import Navbar from './pages/Navbar';
import loginsForm from './pages/LoginsForm';

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
  const { users } = useSelector((state) => state.users);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={userRegister} />
        <Route path="/login" component={loginsForm} />
        <PrivateRoute path="/doctor" users={users} component={doctorSchedule} />
        <PrivateRoute path="/appointment" users={users} component={userAppointment} />
        <PrivateRoute path="/admin" users={users} component={adminPage} />
        <PrivateRoute path="/detail/:id" users={users} component={userAppointmentDetail} />
        <PrivateRoute path="/change_dr/:id" users={users} component={formChangeDr} />
        <PrivateRoute path="/original/:id" users={users} component={formOriginal} />
        <PrivateRoute path="/change_date/:id" users={users} component={formChangeDate} />
      </Switch>
    </Router>
  )
}
