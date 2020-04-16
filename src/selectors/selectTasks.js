import { getTasks } from '../reducers/tasksReducer';

const selectTasks = key =>
  ({ tasks }) => getTasks(tasks, key);

export default selectTasks;
