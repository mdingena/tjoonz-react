import { COMPLETE_TASKS } from '../constants/actionTypes';

const completeTasks = (key, count) => ({
  type: COMPLETE_TASKS,
  payload: { key, count }
});

export default completeTasks;
