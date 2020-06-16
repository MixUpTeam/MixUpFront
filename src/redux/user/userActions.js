import { PROFILE, REMOVE_PROFILE } from 'redux/user/userType';

export const setProfile = (data) => {
  return {
    type: PROFILE,
    details: data,
  };
};

export const removeProfile = () => {
  return {
    type: REMOVE_PROFILE,
  };
};
