import { combineReducers } from 'redux';
import loginReducer from '../ducks/login/index';
import usersReducer from '../ducks/users/index'
import homeReducer from '../ducks/home/index';
import todosReducer from '../ducks/todos/index';

const rootReducer = combineReducers({
  home: homeReducer,
  login: loginReducer,
  todos: todosReducer,
  users: usersReducer
});

export default rootReducer;