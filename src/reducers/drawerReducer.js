import { CLOSE_DRAWER, OPEN_DRAWER } from '../constants/actionTypes';

const sidebarReducer = (state = null, { type, payload }) => {
  switch (type) {
    case CLOSE_DRAWER:
      return null;

    case OPEN_DRAWER:
      return payload.drawer;

    default:
      return state;
  }
};

export default sidebarReducer;
