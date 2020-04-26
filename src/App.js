import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from "react-redux";

import NoMatch from './components/pages/NoMatch';
import LoginPage from './components/pages/LoginPage';
import MainView from './components/pages/MainView';
import { isAuthenticated } from './Utils';

import configureStore from "./redux/configureStore"

import './App.css';

const configuredStore = configureStore();
const store = configuredStore.store;

class App extends React.Component {
  render = () => {
    return (
      <Provider store={store}>
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
      </Provider>
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
