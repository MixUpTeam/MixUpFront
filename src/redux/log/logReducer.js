import { CONNECTION, DISCONNECTION } from 'redux/log/logType';

const initialState = {
  log: false,
};

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTION:
      return {
        ...state,
        log: true,
      };
    case DISCONNECTION:
      return {
        ...state,
        log: false,
      };
    default:
      return state;
  }
};

export default logReducer;
