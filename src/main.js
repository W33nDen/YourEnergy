/**
 * Main entry point - Your Energy SPA
 * Імпортує всі модулі та ініціалізує їх при завантаженні DOM
 */
import './js/header.js';
import { initQuote } from './js/quote.js';
import { initFilters } from './js/filters.js';
import { initFooter } from './js/footer.js';
import { initModals } from './js/modal.js';
import { initFavorites } from './js/favorites.js';

// Запуск при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM Content Loaded - JavaScript працює!');
  console.log('📍 Поточна сторінка:', window.location.pathname);

  // Ініціалізація Quote of the Day
  initQuote();

  // Ініціалізація фільтрів (+ завантаження вправ за замовчуванням)
  initFilters();

  // Ініціалізація футера (підписка)
  initFooter();

  // Ініціалізація модальних вікон
  initModals();

  // Ініціалізація сторінки Favorites (якщо це вона)
  const path = window.location.pathname;
  if (path.includes('favorites.html')) {
    initFavorites();
  }

  console.log('✅ Всі функції ініціалізовано!');
});
