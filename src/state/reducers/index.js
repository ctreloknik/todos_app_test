import { combineReducers } from 'redux';
import homeReducer from './home';
import loginReducer from './login';
import todosReducer from './todos';
import usersReducer from './users'

const rootReducer = combineReducers({
  home: homeReducer,
  login: loginReducer,
  todos: todosReducer,
  users: usersReducer
});

export default rootReducer;