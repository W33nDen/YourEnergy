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
  const path = window.location.pathname;
  const isFavoritesPage = path.includes('favorites.html');

  if (isFavoritesPage) {
    // Favorites page only
    initFavorites();
  } else {
    // Home page only
    initQuote();
    initFilters();
    initModals();
  }

  // Common for all pages
  initFooter();
});
