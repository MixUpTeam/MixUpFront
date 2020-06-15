import { CONNEXION, DECONNEXION } from 'redux/log/logType';

export const setConnexion = () => {
  return {
    type: CONNEXION,
  };
};

export const removeConnexion = () => {
  return {
    type: DECONNEXION,
  };
};
