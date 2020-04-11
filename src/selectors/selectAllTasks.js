import { getAllTasks } from '../reducers/TasksReducer';

const selectAllTasks = ({ tasks }) =>
  getAllTasks(tasks);

export default selectAllTasks;
