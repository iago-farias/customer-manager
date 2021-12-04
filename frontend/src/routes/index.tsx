import { useCallback } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

import CreateCustomer from '../pages/CreateCustomer';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import UpdateCustomer from '../pages/UpdateCustomer';
import PrivateRoute from './PrivateRoute';

export default function Routes() {
  const { isLogged } = useAuth();

  const renderLogin = useCallback(() =>
    !isLogged ?
      <Login />
      : <Redirect to="/dashboard" />
    , [isLogged]);

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={renderLogin}
      />

      <PrivateRoute path="/dashboard" component={Dashboard} role="USER" />
      <PrivateRoute path="/customer/create" component={CreateCustomer} role="ADMIN" />
      <PrivateRoute path="/customer/update" component={UpdateCustomer} role="ADMIN"/>
    </Switch>
  );
}