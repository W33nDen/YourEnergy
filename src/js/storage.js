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

// Favorites helpers - now stores only IDs
const FAVORITES_KEY = 'favorites_ids';

/**
 * Get favorite exercise IDs from LocalStorage
 * @returns {string[]} Array of exercise IDs
 */
export function getFavoriteIds() {
  return load(FAVORITES_KEY) || [];
}

/**
 * Add exercise ID to favorites
 * @param {string} id - Exercise ID
 */
export function addFavoriteId(id) {
  const favoriteIds = getFavoriteIds();
  if (!favoriteIds.includes(id)) {
    favoriteIds.push(id);
    save(FAVORITES_KEY, favoriteIds);
  }
}

/**
 * Remove exercise ID from favorites
 * @param {string} id - Exercise ID
 */
export function removeFavoriteId(id) {
  const favoriteIds = getFavoriteIds();
  const filtered = favoriteIds.filter(favId => favId !== id);
  save(FAVORITES_KEY, filtered);
}

/**
 * Check if exercise is in favorites
 * @param {string} id - Exercise ID
 * @returns {boolean}
 */
export function isFavorite(id) {
  const favoriteIds = getFavoriteIds();
  return favoriteIds.includes(id);
}

// Migration helper - convert old format to new (only IDs)
export function migrateOldFavorites() {
  const oldFavorites = load('favorites');
  if (oldFavorites && Array.isArray(oldFavorites) && oldFavorites.length > 0) {
    // Check if old format (objects with _id)
    if (typeof oldFavorites[0] === 'object' && oldFavorites[0]._id) {
      const ids = oldFavorites.map(item => item._id);
      save(FAVORITES_KEY, ids);
      remove('favorites'); // Remove old key
    }
  }
}
