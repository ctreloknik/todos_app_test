import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import NoMatch from './components/pages/NoMatch';
import LoginPage from './components/pages/LoginPage';
import MainView from './components/pages/MainView';
import HomePage from './components/pages/HomePage';
import { isAuthenticated } from './Utils';

import './App.css';

class App extends React.Component {
  render = () => {
    return (
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/home" pageName='HOME'>
            <HomePage />
          </PrivateRoute>
          <PrivateRoute path="/users" pageName='USERS'>
            users
          </PrivateRoute>
          <PrivateRoute path="/todo" pageName='TODO'>
            test
          </PrivateRoute>
          <Route path="*">
            <NoMatch auth={isAuthenticated()} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        // console.log(location)

        return isAuthenticated() ? (
          <div>
            <MainView pageName={rest.pageName}>
              {children}
            </MainView>
          </div>
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
      }
    />
  );
}

export default App;
