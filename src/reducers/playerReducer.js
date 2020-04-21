import {
  APPEND_PLAYLIST_ITEMS,
  PLAY_NOW,
  REMOVE_PLAYLIST_ITEMS
} from '../constants/actionTypes';

const initialState = {
  isPlaying: false,
  volumeLevel: 0.8,
  playlist: [],
  playhead: null
};

const playerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case APPEND_PLAYLIST_ITEMS:
      return {
        ...state,
        playlist: [...state.playlist, ...payload.items]
      };

    case PLAY_NOW:
      return {
        ...state,
        playlist: [...state.playlist, payload.item],
        playhead: state.playlist.length
      };

    case REMOVE_PLAYLIST_ITEMS:
      return {
        ...state,
        playlist: state.playlist.filter(({ id }) => !payload.items.includes(id))
      };

    default:
      return state;
  }
};

export default playerReducer;
