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

export default function Routers() {
  // const { auth, dataUser } = React.useContext(StoreContext);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={MultiStepper} />
        <Route path="/postpone" component={PostPoneShow} />
        {/* <Route path="/sc" component={Schedule} /> */}
        <Route path="/login" component={LoginsForm} />
         {/* {!!auth || Object.keys(dataUser).length > 0 ?
          <Route path="/postpone" component={PostPoneShow} /> : <h1>ต้อง login</h1>
        }  */}
        <Route path="/admin" component={AdminForm} />
        <Route path="/detail/:id" component={PostPoneDetail} />
        <Route path="/change_dr/:id" component={ChangeDr} />
        <Route path="/original/:id" component={OriginalForm} />
        <Route path="/change_date/:id" component={ChangeDate} />
      </Switch>
    </Router >
  )
}
