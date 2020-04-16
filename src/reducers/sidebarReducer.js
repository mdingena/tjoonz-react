import { TOGGLE_SIDEBAR } from '../constants/actionTypes';

const sidebarReducer = (state = null, { type, payload }) => {
  switch (type) {
    case TOGGLE_SIDEBAR:
      return state ? payload : null;

    default:
      return state;
  }
};

export default sidebarReducer;
