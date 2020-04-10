const selectTasks = key =>
  ({ tasks }) => {
    if (key) return tasks[key] || 0;

    return Object.values(tasks).reduce((sum, taskCount) => sum + taskCount, 0);
  };

export default selectTasks;
