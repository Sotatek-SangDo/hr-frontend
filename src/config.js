export default {
  storage(item, value) {
    return value !== undefined
      ? localStorage.setItem(item, value)
      : localStorage.getItem(item);
  },
  xstorage(item) {
    localStorage.removeItem(item);
  }
};
