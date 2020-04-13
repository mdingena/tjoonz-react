import { ADD_TASKS, COMPLETE_TASKS, REMOVE_ALL_TASKS } from '../constants/actionTypes';

const TasksReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_TASKS:
      return {
        ...state,
        [payload.key]: state[payload.key]
          ? { ...state[payload.key], count: payload.count + state[payload.key].count }
          : { completed: 0, count: payload.count }
      };

    case COMPLETE_TASKS:
      return hasMoreTasks(state, payload)
        ? {
          ...state,
          [payload.key]: {
            ...state[payload.key],
            completed: state[payload.key].completed + payload.count
          }
        }
        : {};

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
    (queue, { completed, count }) => ({
      completed: queue.completed + completed,
      count: queue.count + count
    }),
    { completed: 0, count: 0 }
  );

export const getTasks = (state, key) => state[key] || { completed: 0, count: 0 };

const hasMoreTasks = (state, payload) => {
  const hasMoreCurrentTasks = state[payload.key]
    ? state[payload.key].count > (state[payload.key].completed + payload.count)
    : false;

  const { completed, count } = getAllTasks(state);
  const hasMoreOtherTasks = count > (completed + payload.count);

  return hasMoreCurrentTasks || hasMoreOtherTasks;
};

const removeFromQueue = (state, payload) =>
  Object.entries(state).reduce(
    (queue, { key, tasks }) => key !== payload.key
      ? { ...queue, [key]: tasks }
      : queue,
    {}
  );
