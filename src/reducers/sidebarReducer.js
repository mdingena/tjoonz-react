import { TOGGLE_SIDEBAR } from '../constants/actionTypes';

const sidebarReducer = (state = [], { type, payload }) => {
  switch (type) {
    case TOGGLE_SIDEBAR:
      return state[payload.key]
        ? state.filter(key => key !== payload.key)
        : [payload.key, ...state];

    default:
      return state;
  }
};

export default sidebarReducer;
