import {
  SET_TRACKS,
  CREATE_TRACK,
  SET_CURRENT_TRACK,
} from 'redux/tracklist/tracklistType';

export const setTracks = (tracks, name, owner) => {
  return {
    type: SET_TRACKS,
    details: tracks,
    name,
    owner,
  };
};

export const createTrack = (track) => {
  return {
    type: CREATE_TRACK,
    details: track,
  };
};

export const setCurrentTrack = (track) => {
  return {
    type: SET_CURRENT_TRACK,
    currentTrack: track,
  };
};
