/**
 * Модуль для завантаження та відображення Quote of the Day
 */
import { YourEnergyAPI } from './api.js';

const api = new YourEnergyAPI();

/**
 * Ініціалізація та завантаження цитати дня
 */
export async function initQuote() {
  console.log('🎬 initQuote() викликано');

  const quoteWrapper = document.getElementById('quote-wrapper');

  if (!quoteWrapper) {
    console.error('❌ #quote-wrapper не знайдено в DOM!');
    return;
  }

  console.log('✅ #quote-wrapper знайдено:', quoteWrapper);

  try {
    // Завантажити дані з API
    const data = await api.getQuote();

    console.log('📝 Отримані дані цитати:', data);

    // Заповнити елементи даними
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');

    if (quoteText && quoteAuthor) {
      quoteText.textContent = data.quote;
      quoteAuthor.textContent = data.author;

      // Показати блок (прибрати клас hidden)
      quoteWrapper.classList.remove('hidden');

      console.log('✅ Quote успішно відображено!');
    } else {
      console.error('❌ Елементи #quote-text або #quote-author не знайдені!');
    }
  } catch (error) {
    console.error('❌ Помилка завантаження цитати:', error);

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
