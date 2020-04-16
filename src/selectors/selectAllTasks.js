import { getAllTasks } from '../reducers/tasksReducer';

const selectAllTasks = ({ tasks }) =>
  getAllTasks(tasks);

export default selectAllTasks;
