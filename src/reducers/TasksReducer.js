import { ADD_TASKS, COMPLETE_TASKS } from '../constants/actionTypes';

const initialState = {
  completed: 0,
  queued: {}
};

const TasksReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TASKS:
      return {
        ...state,
        queued: {
          [payload.key]: payload.count + (state.queued[payload.key] || 0)
        }
      };

    case COMPLETE_TASKS:
      return {
        ...state,
        completed: state.completed + payload.count
      };

    default:
      return state;
  }
};

export default TasksReducer;
