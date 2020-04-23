import {
  APPEND_PLAYLIST_ITEMS,
  START_PLAYBACK,
  REMOVE_PLAYLIST_ITEMS
} from '../constants/actionTypes';

const initialState = {
  isPlaying: false,
  volumeLevel: 0.8,
  playlist: [],
  playhead: null
};

const playerReducer = (state = initialState, { type, payload }) => {
  let playlist;

  switch (type) {
    case APPEND_PLAYLIST_ITEMS:
      return {
        ...state,
        playlist: [...state.playlist, ...payload.items]
      };

    case START_PLAYBACK:
      playlist = [...state.playlist.filter(({ id }) => id !== payload.item.id), payload.item];
      return {
        ...state,
        playlist,
        playhead: playlist.length - 1
      };

    case REMOVE_PLAYLIST_ITEMS:
      playlist = state.playlist.filter(({ id }) => !payload.items.includes(id));
      return {
        ...state,
        playlist,
        playhead: playlist.length ? Math.min(playlist.length - 1, state.playhead) : null
      };

    default:
      return state;
  }
};

export default playerReducer;
