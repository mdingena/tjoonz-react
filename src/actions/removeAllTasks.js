import { REMOVE_ALL_TASKS } from '../constants/actionTypes';

const removeAllTasks = key => ({
  type: REMOVE_ALL_TASKS,
  payload: { key }
});

export default removeAllTasks;
