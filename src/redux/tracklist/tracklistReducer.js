import { SET_TRACKS, SET_CURRENT_TRACK } from './tracklistType';

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
