import { ADD_TASKS } from '../constants/actionTypes';

const addTasks = (key, count) => ({
  type: ADD_TASKS,
  payload: { key, count }
});

export default addTasks;
