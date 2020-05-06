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
  // constructor(props) {
  //   super(props);

  // ApiHelper.getInfoAboutMe()
  //   .then((data) => {
  //     console.log('on');
  //     onSuccessfullLogin(data);
  //     useHistory().replace('/home');
  //   }).catch((err) => {
  //     if (err.response && err.response.status === 401) {
  //       doLogout();
  //       useHistory().replace('/login');
  //     }
  //   });
  // }

  render = () => {
    return (
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/home">
            <HomePage />
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
            <MainView>
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
