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
import { isAuthenticated } from './Utils';

import './App.css';

class App extends React.Component {
  render = () => {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/home">
            <ProtectedPage />
          </PrivateRoute>
          <PrivateRoute path="/todo">
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
            <MainView />
            {children}
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

function ProtectedPage() {
  return <h3>Protected</h3>;
}

export default App;
