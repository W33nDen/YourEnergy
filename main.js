/**
 * Головний файл ініціалізації Your Energy додатку
 */
import './src/js/header.js';
import './src/js/footer.js';
import { initModals } from './src/js/modal.js';
import { initFilters } from './src/js/filters.js';
import { initFavorites } from './src/js/favorites.js';
import { initQuote } from './src/js/quote.js';

console.log('🚀 Your Energy app starting...');

/**
 * Ініціалізація додатку після завантаження DOM
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM завантажено!');

  // Визначити поточну сторінку
  const path = window.location.pathname;
  const isFavoritesPage = path.includes('favorites.html');

  console.log('📄 Поточна сторінка:', isFavoritesPage ? 'Favorites' : 'Home');

  if (isFavoritesPage) {
    // Ініціалізація сторінки Favorites
    initFavorites();
  } else {
    // Ініціалізація головної сторінки
    initQuote(); // Завантажити цитату дня
    initFilters(); // Завантажити фільтри та вправи
  }

  // Ініціалізувати модальні вікна (спільно для обох сторінок)
  initModals();

  console.log('✅ Ініціалізація завершена!');
});
