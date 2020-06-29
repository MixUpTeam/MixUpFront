import Cookies from 'js-cookie';
import { CONNECTION, DISCONNECTION } from './logType';
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
