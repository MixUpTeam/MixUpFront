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

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
