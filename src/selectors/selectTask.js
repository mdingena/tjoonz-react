const selectTask = key =>
  ({ tasks }) =>
    tasks.queued[key] || 0;

export default selectTask;
