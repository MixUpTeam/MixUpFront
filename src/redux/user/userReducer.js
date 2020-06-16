import { PROFILE, REMOVE_PROFILE } from 'redux/user/userType';

const initialState = {
  data: {},
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
