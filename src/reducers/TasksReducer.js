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
        completed: hasMoreTasks(state, payload) ? (state.completed + payload.count) : 0,
        queued: hasMoreTasks(state, payload) ? state.queued : 0
      };

    default:
      return state;
  }
};

export default TasksReducer;

export const getQueuedTasksCount = state =>
  Object.values(state.queued).reduce((sum, taskCount) => sum + taskCount, 0);

const hasMoreTasks = (state, payload) =>
  getQueuedTasksCount(state) > (state.completed + payload.count);
