import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import ErrorBoundary from './components/common/ErrorBoundary';
import NoMatch from './components/pages/NoMatch';
import LoginPage from './components/pages/LoginPage';
import MainView from './components/pages/MainView';
import HomePage from './components/pages/HomePage';
import UsersPage from './components/pages/UsersPage';
import TodosListPage from './components/pages/TodosListPage/TodosListPage';

import { isAuthenticated } from './Utils';

import './App.css';

class App extends React.Component {
  render = () => {
    return (
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/home" pageName='HOME'>
              <HomePage />
            </PrivateRoute>
            <PrivateRoute path="/users" pageName='USERS'>
              <UsersPage/>
            </PrivateRoute>
            <PrivateRoute path="/todo" pageName='TODO'>
              <TodosListPage />
            </PrivateRoute>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </ErrorBoundary>
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
