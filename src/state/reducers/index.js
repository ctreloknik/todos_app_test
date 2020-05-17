import { combineReducers } from 'redux';
import homeReducer from './home';
import loginReducer from './login';
import todosReducer from './todos'

const rootReducer = combineReducers({
  home: homeReducer,
  login: loginReducer,
  todos: todosReducer,
});

export default rootReducer;