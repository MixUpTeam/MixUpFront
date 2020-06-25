import {
  SET_TRACKS,
  CREATE_TRACK,
  SET_CURRENT_TRACK
} from 'redux/tracklist/tracklistType';

const initialState = {
  tracks: [],
  name: null,
  owner: null,
  currentTrack: null,
};

const tracklistReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACKS:
      return {
        ...state,
        tracks: action.details,
          name: action.name,
          owner: action.owner,
      };
    case CREATE_TRACK:
      return {
        ...state,
        tracks: state.tracks.concat(action.details),
      };
    case SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.currentTrack,
      };
    default:
      return state;
  }
};

export default tracklistReducer;