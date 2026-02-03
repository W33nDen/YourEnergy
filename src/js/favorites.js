import { YourEnergyAPI } from './api.js';
import * as storage from './storage.js';
import { showToast } from './toast.js';
import { initModals } from './modal.js';

const api = new YourEnergyAPI();

const elements = {
  favoritesContainer: document.getElementById('favorites-container'),
  favoritesEmpty: document.getElementById('favorites-empty'),
  quoteWrapper: document.getElementById('quote-wrapper'),
};

export async function initFavorites() {
  renderFavorites();

  // Add event listener for removing from favorites
  elements.favoritesContainer.addEventListener('click', handleRemoveFavorite);

  // Initialize modals for interaction with favorite exercise cards
  initModals();

  // Render quote of the day (it's also on the favorites page)
  await initQuoteForFavoritesPage();
}

async function initQuoteForFavoritesPage() {
  if (!elements.quoteWrapper) return;

  const quoteText = elements.quoteWrapper.querySelector('#quote-text');
  const quoteAuthor = elements.quoteWrapper.querySelector('#quote-author');

  const today = new Date().toDateString();
  const savedQuote = storage.load('quote');

  if (savedQuote && savedQuote.date === today) {
    renderQuote({ quote: savedQuote.quote, author: savedQuote.author });
  } else {
    try {
      const data = await api.getQuote();
      if (!data || !data.quote) throw new Error('No quote data');
      const quoteToSave = { ...data, date: today };
      storage.save('quote', quoteToSave);
      renderQuote({ quote: quoteToSave.quote, author: quoteToSave.author });
    } catch (error) {
      const fallbackQuote = {
        quote: "The only bad workout is the one that didn't happen.",
        author: 'Unknown',
      };
      renderQuote(fallbackQuote);
    }
  }

  function renderQuote({ quote, author }) {
    if (quoteText) quoteText.textContent = quote;
    if (quoteAuthor) quoteAuthor.textContent = author;
    elements.quoteWrapper.classList.remove('hidden');
  }
}

function renderFavorites() {
  const favorites = storage.load('favorites') || [];

  if (favorites.length === 0) {
    elements.favoritesEmpty.classList.remove('hidden');
    elements.favoritesContainer.innerHTML = '';
    return;
  }

  elements.favoritesEmpty.classList.add('hidden');
  const cardsMarkup = favorites
    .map(
      exercise => `
    <li class="exercise-card" data-id="${exercise._id}">
      <div class="exercise-content">
        <div class="exercise-left">
          <span class="workout-badge">Workout</span>
          <div class="rating-wrap">
            <span>${exercise.rating.toFixed(1)}</span>
            ${renderStars(exercise.rating)}
          </div>
          <div class="exercise-title-box">
            <div class="icon-run-wrapper">
              <svg class="icon-run" width="12" height="12">
                <use href="./img/sprite.svg#icon-run"></use>
              </svg>
            </div>
            <h3 class="exercise-name">${exercise.name}</h3>
          </div>
          <ul class="exercise-details">
            <li class="detail-item">
              <p class="detail-label">Burned calories:</p>
              <p class="detail-value">${exercise.burnedCalories} / ${exercise.time} min</p>
            </li>
            <li class="detail-item">
              <p class="detail-label">Body part:</p>
              <p class="detail-value">${exercise.bodyPart}</p>
            </li>
            <li class="detail-item">
              <p class="detail-label">Target:</p>
              <p class="detail-value">${exercise.target}</p>
            </li>
          </ul>
        </div>
        <div class="exercise-right">
          <button class="start-btn" type="button" data-id="${exercise._id}">Start
            <svg width="14" height="14">
              <use href="./img/sprite.svg#icon-arrow"></use>
            </svg>
          </button>
          <button class="remove-from-favorites-btn" type="button" data-id="${exercise._id}">
            <svg class="icon-trash" width="16" height="16">
              <use href="./img/sprite.svg#icon-trash"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
    `
    )
    .join('');

  elements.favoritesContainer.innerHTML = `<ul class="favorites-list">${cardsMarkup}</ul>`;
}

function renderStars(rating) {
  let starsMarkup = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsMarkup += `<svg class="star-icon filled" width="14" height="14"><use href="./img/sprite.svg#icon-star"></use></svg>`;
    } else if (hasHalfStar && i === fullStars) {
      starsMarkup += `<svg class="star-icon" width="14" height="14"><use href="./img/sprite.svg#icon-star"></use></svg>`;
    } else {
      starsMarkup += `<svg class="star-icon" width="14" height="14"><use href="./img/sprite.svg#icon-star"></use></svg>`;
    }
  }
  return starsMarkup;
}

function handleRemoveFavorite(event) {
  const removeBtn = event.target.closest('.remove-from-favorites-btn');
  if (!removeBtn) return;

  const exerciseId = removeBtn.dataset.id;
  if (exerciseId) {
    let favorites = storage.load('favorites') || [];
    favorites = favorites.filter(fav => fav._id !== exerciseId);
    storage.save('favorites', favorites);
    showToast('Exercise removed from favorites!', 'success');
    renderFavorites(); // Re-render the list
  }
}
