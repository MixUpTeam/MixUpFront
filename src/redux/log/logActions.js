import { CONNECTION, DISCONNECTION } from './logType';

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
