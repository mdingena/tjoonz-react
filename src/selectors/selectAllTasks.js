const selectAllTasks = ({ tasks }) =>
  Object.values(tasks.queued).reduce((sum, taskCount) => sum + taskCount, 0);

export default selectAllTasks;
