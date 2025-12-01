import { YourEnergyAPI } from './js/api.js';
import * as storage from './js/storage.js';
import { initFilters } from './js/filters.js'; // <-- Додали імпорт

const api = new YourEnergyAPI();

// --- Quote of the Day Logic ---
async function initQuote() {
  // ... (весь код initQuote залишається без змін, я не буду його дублювати, щоб не плутати) ...
  // Просто переконайся, що стара функція initQuote нікуди не зникла.
  const quoteWrapper = document.getElementById('quote-wrapper');
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');

  if (!quoteWrapper) return;

  const today = new Date().toDateString();
  const savedQuote = storage.load('quote');

  if (savedQuote && savedQuote.date === today) {
    console.log('Quote loaded from cache');
    renderQuote(savedQuote);
  } else {
    try {
      console.log('Fetching new quote...');
      const data = await api.getQuote();
      const quoteToSave = { ...data, date: today };
      storage.save('quote', quoteToSave);
      renderQuote(quoteToSave);
    } catch (error) {
      console.error('Failed to fetch quote:', error);
    }
  }

  function renderQuote({ quote, author }) {
    quoteText.textContent = quote;
    quoteAuthor.textContent = author;
    quoteWrapper.classList.remove('hidden');
  }
}

// Запуск при завантаженні
document.addEventListener('DOMContentLoaded', () => {
  initQuote();
  initFilters(); // <-- Додали виклик фільтрів
});
