import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { StoreContext } from './Context/Store';

import Navbar from './pages/Navbar';
import LoginsForm from './pages/LoginsForm';
import MultiStepper from './pages/MultiStepper';
import PostPoneShow from './pages/PostPoneShow';

import OriginalForm from './components/Admin/OriginalForm';
import Schedule from './components/Doctors/Schedule';
import PostPoneDetail from './components/User/PostPoneDetail';
import PrivateRoute from './PrivateRoute';
import adminPage from './pages/admin/adminPage';
import formChangeDate from './pages/admin/formChangeDate';
import formChangeDr from './pages/admin/formChangeDr';

export default function Routers() {
  const { dataUserNow } = React.useContext(StoreContext);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={MultiStepper} />
        <Route path="/login" component={LoginsForm} />
        <Route path="/sc" component={Schedule} />

        <PrivateRoute path="/postpone" dataUserNow={dataUserNow} component={PostPoneShow} />
        <PrivateRoute path="/admin" dataUserNow={dataUserNow} component={adminPage} />
        <PrivateRoute path="/detail/:id" dataUserNow={dataUserNow} component={PostPoneDetail} />
        <PrivateRoute path="/change_dr/:id" dataUserNow={dataUserNow} component={formChangeDr} />
        <PrivateRoute path="/original/:id" dataUserNow={dataUserNow} component={OriginalForm} />
        <PrivateRoute path="/change_date/:id" dataUserNow={dataUserNow} component={formChangeDate} />
      </Switch>
    </Router>
  )
}
