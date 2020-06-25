import { SET_TRACKS, CREATE_TRACK } from 'redux/tracklist/tracklistType';

const initialState = {
  tracks: [],
  name: null,
  owner: null,
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
    default:
      return state;
  }
};

export default tracklistReducer;
