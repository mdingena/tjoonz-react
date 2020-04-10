const selectAllTasks = ({ tasks }) => ({
  completed: tasks.completed,
  queued: Object.values(tasks.queued).reduce((sum, taskCount) => sum + taskCount, 0)
});

export default selectAllTasks;
