import { DONE_SUBMITTING_COMMENT, START_SUBMITTING_COMMENT } from '../constants/actionTypes';

const initialState = {
  isSubmitting: false,
  submittingFor: 0,
  statusText: null
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DONE_SUBMITTING_COMMENT:
      return {
        ...state,
        isSubmitting: false,
        statusText: payload.statusText
      };

    case START_SUBMITTING_COMMENT:
      return {
        ...state,
        isSubmitting: true,
        submittingFor: payload.id,
        statusText: null
      };

    default:
      return state;
  }
};

export default authReducer;
