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
    // Silently handle localStorage errors
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
    // Silently handle localStorage errors
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
    // Silently handle localStorage errors
  }
};

// Favorites helpers
const FAVORITES_KEY = 'favorites';

export function getFavorites() {
  return load(FAVORITES_KEY) || [];
}

export function addFavorite(exercise) {
  const favorites = getFavorites();
  if (!favorites.some(item => item._id === exercise._id)) {
    favorites.push(exercise);
    save(FAVORITES_KEY, favorites);
  }
}

export function removeFavorite(id) {
  const favorites = getFavorites();
  const filtered = favorites.filter(item => item._id !== id);
  save(FAVORITES_KEY, filtered);
}

export function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.some(item => item._id === id);
}
