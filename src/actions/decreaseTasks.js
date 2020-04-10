import { DECREASE_TASKS } from '../constants/actionTypes';

const decreaseTasks = (key, count) => ({
  type: DECREASE_TASKS,
  payload: { key, count }
});

export default decreaseTasks;
