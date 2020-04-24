import {
  APPEND_PLAYLIST_ITEMS,
  PAUSE_PLAYBACK,
  REMOVE_PLAYLIST_ITEMS,
  RESUME_PLAYBACK,
  SKIP_BACKWARD,
  SKIP_FORWARD,
  START_PLAYBACK
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
        playlist: [...state.playlist, ...payload.items],
        playhead: state.playlist.length > 0 ? state.playhead : 0
      };

    case PAUSE_PLAYBACK:
      return {
        ...state,
        isPlaying: false
      };

    case REMOVE_PLAYLIST_ITEMS:
      playlist = state.playlist.filter(({ id }) => !payload.items.includes(id));
      return {
        ...state,
        playlist,
        playhead: playlist.length ? Math.min(playlist.length - 1, state.playhead) : null
      };

    case RESUME_PLAYBACK:
      return {
        ...state,
        isPlaying: true
      };

    case SKIP_BACKWARD:
      return {
        ...state,
        playhead: state.playlist.length ? Math.max(0, state.playhead - 1) : state.playhead
      };

    case SKIP_FORWARD:
      return {
        ...state,
        playhead: state.playlist.length ? Math.min(state.playlist.length - 1, state.playhead + 1) : state.playhead
      };

    case START_PLAYBACK:
      playlist = [...state.playlist.filter(({ id }) => id !== payload.item.id), payload.item];
      return {
        ...state,
        isPlaying: true,
        playlist,
        playhead: playlist.length - 1
      };

    default:
      return state;
  }
};

export default playerReducer;
