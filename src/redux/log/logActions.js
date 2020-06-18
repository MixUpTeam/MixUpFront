import { CONNECTION, DISCONNECTION } from 'redux/log/logType';

export const setConnection = () => {
  return {
    type: CONNECTION,
  };
};

export const removeConnection = () => {
  return {
    type: DISCONNECTION,
  };
};
