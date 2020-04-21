export const debounce = (cb, wait) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb.apply(this, args);
    }, wait);
  };
};
