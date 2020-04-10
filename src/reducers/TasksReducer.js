import { ADD_TASKS } from '../constants/actionTypes';

const TasksReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_TASKS:
      return {
        ...state,
        [payload.key]: payload.count + (state[payload.key] ? state[payload.key].count : 0)
      };

    default:
      return state;
  }
};

export default TasksReducer;
