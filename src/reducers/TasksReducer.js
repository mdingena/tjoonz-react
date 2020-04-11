import { ADD_TASKS, COMPLETE_TASKS, REMOVE_ALL_TASKS } from '../constants/actionTypes';

const TasksReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_TASKS:
      return {
        ...state,
        [payload.key]: state[payload.key]
          ? { ...state[payload.key], pending: payload.count + state[payload.key].pending }
          : { completed: 0, pending: payload.count }
      };

    case COMPLETE_TASKS:
      return {
        ...state,
        [payload.key]: {
          ...state[payload.key],
          completed: hasMoreTasks(state, payload) ? (state[payload.key].completed + payload.count) : 0,
          pending: hasMoreTasks(state, payload) ? state[payload.key].pending : 0
        }
      };

    case REMOVE_ALL_TASKS:
      return {
        ...removeFromQueue(state, payload)
      };

    default:
      return state;
  }
};

export default TasksReducer;

export const getAllTasks = state =>
  Object.values(state).reduce(
    (queue, { completed, pending }) => ({
      completed: queue.completed + completed,
      pending: queue.pending + pending
    }),
    { completed: 0, pending: 0 }
  );

export const getTasks = (state, key) => state[key];

const hasMoreTasks = (state, payload) =>
  state[payload.key].pending > (state[payload.key].completed + payload.count);

const removeFromQueue = (state, payload) =>
  Object.entries(state).reduce(
    (queue, { key, tasks }) => key !== payload.key
      ? { ...queue, [key]: tasks }
      : queue,
    {}
  );
