import { Route, Switch } from 'react-router-dom';

import CreateCustomer from '../pages/CreateCustomer';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import UpdateCustomer from '../pages/UpdateCustomer';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/customer/create" component={CreateCustomer} />
      <Route path="/customer/update" component={UpdateCustomer} />
    </Switch>
  );
}