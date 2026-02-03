/**
 * Модуль для завантаження та відображення Quote of the Day
 * З кешуванням в localStorage для зменшення запитів до API
 */
import { YourEnergyAPI } from './api.js';

const api = new YourEnergyAPI();
const QUOTE_STORAGE_KEY = 'yourEnergy_quote';

/**
 * Отримати сьогоднішню дату у форматі YYYY-MM-DD
 */
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Отримати кешовану цитату з localStorage
 */
function getCachedQuote() {
  try {
    const cached = localStorage.getItem(QUOTE_STORAGE_KEY);
    if (!cached) return null;

    const { date, quote, author } = JSON.parse(cached);

    // Перевіряємо чи цитата за сьогодні
    if (date === getTodayDate()) {
      return { quote, author };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Зберегти цитату в localStorage
 */
function cacheQuote(quote, author) {
  try {
    const data = {
      date: getTodayDate(),
      quote,
      author,
    };
    localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ігноруємо помилки localStorage
  }
}

/**
 * Ініціалізація та завантаження цитати дня
 */
export async function initQuote() {
  const quoteWrapper = document.getElementById('quote-wrapper');

  if (!quoteWrapper) {
    return;
  }

  try {
    // Спробувати отримати кешовану цитату
    const cached = getCachedQuote();

    let quoteData;
    if (cached) {
      quoteData = cached;
    } else {
      // Завантажити з API та закешувати
      quoteData = await api.getQuote();
      cacheQuote(quoteData.quote, quoteData.author);
    }

    // Заповнити елементи даними
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');

    if (quoteText && quoteAuthor) {
      quoteText.textContent = quoteData.quote;
      quoteAuthor.textContent = quoteData.author;
      quoteWrapper.classList.remove('hidden');
    }
  } catch (error) {
    // Fallback: показати дефолтну цитату
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');

    if (quoteText && quoteAuthor) {
      quoteText.textContent =
        "The only bad workout is the one that didn't happen.";
      quoteAuthor.textContent = 'Unknown';
      quoteWrapper.classList.remove('hidden');
    }
  }
}
