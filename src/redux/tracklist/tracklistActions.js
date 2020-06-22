import { SET_TRACKS, CREATE_TRACK } from 'redux/tracklist/tracklistType';

export const setTracks = (tracks) => {
  return {
    type: SET_TRACKS,
    details: tracks,
  };
};

export const createTrack = (track) => {
  return {
    type: CREATE_TRACK,
    details: track,
  };
};
