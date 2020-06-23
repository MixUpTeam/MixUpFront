import { PROFILE, REMOVE_PROFILE } from 'redux/user/userType';
import Cookies from 'js-cookie';
import { cookieName } from '../../constants';

const initialState = {
  data: Cookies.get(cookieName)
    ? JSON.parse(Cookies.get(cookieName)).userInfo
    : {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE:
      return {
        ...state,
        data: action.details,
      };
    case REMOVE_PROFILE:
      return {
        ...state,
        data: {},
      };
    default:
      return state;
  }
};

export default userReducer;
