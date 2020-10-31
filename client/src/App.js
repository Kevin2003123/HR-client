import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import Navbar from './components/layout/Navbar';
//import Landing from './components/layout/landing';
//import Routes from './components/routing/Routes';
import Login from './components/auth/Login';
import Employees from './components/AdminPage/Employees';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import Assingments from './components/EmployeePage/Assingments';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Login} />
            <PrivateRoute exact path='/admin' component={Employees} />
            <PrivateRoute exact path='/assignment' component={Assingments} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
