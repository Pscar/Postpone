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
import userPostPoneDetail from './pages/user/userPostPoneDetail';
import userRegister from './pages/user/userRegister';
import userPostPone from './pages/user/userPostPone';
import { useSelector } from 'react-redux';


export default function Routers() {
  const { users } = useSelector((state) => state.users);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={userRegister} />
        <Route path="/login" component={loginsForm} />
        <Route path="/doctor" component={doctorSchedule} />

        <PrivateRoute path="/postpone" users={users} component={userPostPone} />
        <PrivateRoute path="/admin" users={users} component={adminPage} />
        <PrivateRoute path="/detail/:id" users={users} component={userPostPoneDetail} />
        <PrivateRoute path="/change_dr/:id" users={users} component={formChangeDr} />
        <PrivateRoute path="/original/:id" users={users} component={formOriginal} />
        <PrivateRoute path="/change_date/:id" users={users} component={formChangeDate} />
      </Switch>
    </Router>
  )
}
