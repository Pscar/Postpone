import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import PrivateRoute from './PrivateRoute';
import Navbar from './pages/Navbar';
import loginsForm from './pages/LoginsForm';
import resgiterForm from './pages/ResgiterForm';
import doctorSchedule from './pages/Doctor/doctorSchedule';
import adminPage from './pages/Admin/adminPage';
import formEditAppointment from './pages/Admin/formEditAppointment';
import patientAppointmentDetail from './pages/Patient/patientAppointmentDetail';
import patientCreateAppointment from './pages/Patient/patientCreateAppointment';
import patientAppointment from './pages/Patient/patientAppointment';
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
        <PrivateRoute path="/appointment" users={logins} component={patientAppointment} />
        <PrivateRoute path="/create" users={logins} component={patientCreateAppointment} />
        <PrivateRoute path="/admin" users={logins} component={adminPage} />
        <PrivateRoute path="/detail/:id" users={logins} component={patientAppointmentDetail} />
        <PrivateRoute path="/edit/:id" users={logins} component={formEditAppointment} />
      </Switch>
    </Router>
  )
}
