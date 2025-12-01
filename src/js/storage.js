/**
 * Збереження даних у LocalStorage
 * @param {string} key
 * @param {any} value
 */
export const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

/**
 * Отримання даних з LocalStorage
 * @param {string} key
 * @returns {any}
 */
export const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

/**
 * Видалення даних з LocalStorage
 * @param {string} key
 */
export const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Remove state error: ', error.message);
  }
};
