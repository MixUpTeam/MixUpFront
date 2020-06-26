import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import logReducer from 'redux/log/logReducer';
import userReducer from 'redux/user/userReducer';
import tracklistReducer from 'redux/tracklist/tracklistReducer';

const rootReducer = combineReducers({
  log: logReducer,
  user: userReducer,
  tracks: tracklistReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
export default store;
