export const debounce = (cb, wait) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb.apply(this, args);
    }, wait);
  };
};

export const checkLocalStorageAvailability = () => {
  const t = 't';
  try {
    window.localStorage.setItem(t, t);
    window.localStorage.removeItem(t);
    return true;
  } catch (e) {
    return false;
  }
};

export const clamp = (value, lowerBound, upperBound) =>
  Math.min(Math.max(value, lowerBound), upperBound);
