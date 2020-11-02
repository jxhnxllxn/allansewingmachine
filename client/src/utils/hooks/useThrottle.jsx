export const useThrottle = (func, timeout) => {
    let ready = true;
    return (...args) => {
      if (!ready) {
        return;
      }
      ready = false;
      func(...args);
      setTimeout(() => {
        ready = true;
      }, timeout);
    };
  }
