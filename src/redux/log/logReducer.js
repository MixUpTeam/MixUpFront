import { CONNECTION, DISCONNECTION } from 'redux/log/logType';
import Cookies from 'js-cookie';
import { cookieName } from '../../constants';

const initialState = {
  user_connected: !!Cookies.get(cookieName),
};

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTION:
      return {
        ...state,
        user_connected: true,
      };
    case DISCONNECTION:
      return {
        ...state,
        user_connected: false,
      };
    default:
      return state;
  }
};

export default logReducer;
