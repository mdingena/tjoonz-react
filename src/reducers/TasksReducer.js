import { ADD_TASKS, DECREASE_TASKS } from '../constants/actionTypes';

const TasksReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_TASKS:
      return {
        ...state,
        [payload.key]: payload.count + (state[payload.key] || 0)
      };

    case DECREASE_TASKS:
      return {
        ...state,
        [payload.key]: Math.max((state[payload.key] || 0) - payload.count, 0)
      };

    default:
      return state;
  }
};

export default TasksReducer;
