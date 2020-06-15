import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import logReducer from 'redux/log/logReducer';
import userReducer from 'redux/user/userReducer';

const rootReducer = combineReducers({
  log: logReducer,
  user: userReducer,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
