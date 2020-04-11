import { getTasks } from '../reducers/TasksReducer';

const selectTasks = key =>
  ({ tasks }) => getTasks(tasks, key);

export default selectTasks;
