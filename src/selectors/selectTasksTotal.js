import { getTasksTotal } from '../reducers/TasksReducer';

const selectTasksTotal = ({ tasks }) => getTasksTotal(tasks);

export default selectTasksTotal;
