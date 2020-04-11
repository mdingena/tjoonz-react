import { getQueuedTasksCount } from '../reducers/TasksReducer';

const selectAllTasks = ({ tasks }) => ({
  completed: tasks.completed,
  queued: getQueuedTasksCount(tasks)
});

export default selectAllTasks;
