import { SET_DETAILS } from '../constants/actionTypes';

const detailsReducer = (state = null, { type, payload }) => {
  switch (type) {
    case SET_DETAILS:
      return payload.mix;

    default:
      return state;
  }
};

export default detailsReducer;
