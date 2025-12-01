import { YourEnergyAPI } from './api.js';

const api = new YourEnergyAPI();
const container = document.getElementById('exercises-container');
const searchForm = document.getElementById('search-form');
const titleElement = document.querySelector('.exercises-title');

// Мапа для перекладу назв фільтрів у параметри API
const FILTER_MAP = {
  'Body parts': 'bodypart',
  Muscles: 'muscles',
  Equipment: 'equipment',
};

/**
 * Завантаження вправ
 * @param {string} filter - Назва фільтра (наприклад, "Muscles")
 * @param {string} name - Назва категорії (наприклад, "Abs")
 */
export async function loadExercises(filter, name) {
  // 1. Оновлюємо заголовок (Breadcrumbs)
  // Було: Exercises. Стане: Exercises / Muscles / Abs
  titleElement.innerHTML = `Exercises / <span class="breadcrumbs">${filter}</span> / <span class="breadcrumbs-current">${name}</span>`;

  // 2. Показуємо форму пошуку
  if (searchForm) searchForm.classList.remove('hidden');

  // 3. Показуємо лоадер
  container.innerHTML = '<p class="loader-text">Loading exercises...</p>';

  try {
    // Формуємо параметри для API
    // API приймає paramName: muscles, bodypart, equipment
    const paramName = FILTER_MAP[filter];
    const params = {
      [paramName]: name.toLowerCase(), // API любить малі літери
      page: 1,
      limit: 10,
    };

    const data = await api.getExercises(params);

    if (!data.results || data.results.length === 0) {
      container.innerHTML = '<p class="loader-text">No exercises found.</p>';
      return;
    }

    renderExercises(data.results);

    // Тут треба буде додати логіку пагінації пізніше
  } catch (error) {
    console.error(error);
    container.innerHTML =
      '<p class="loader-text" style="color: red">Error loading exercises.</p>';
  }
}

/**
 * Рендер карток вправ
 */
function renderExercises(exercises) {
  const markup = exercises
    .map(
      ex => `
    <div class="exercise-card">
      <div class="exercise-top">
        <div class="workout-badge">WORKOUT</div>
        <div class="rating-wrap">
          <span class="rating-value">${ex.rating.toFixed(1)}</span>
          <svg class="rating-icon" width="18" height="18">
            <use href="./img/sprite.svg#icon-star"></use>
          </svg>
        </div>
        <button class="start-btn" type="button" data-id="${ex._id}">
          Start
          <svg width="16" height="16" stroke="currentColor">
            <use href="./img/sprite.svg#icon-arrow"></use>
          </svg>
        </button>
      </div>

      <div class="exercise-title-box">
        <div class="icon-run-wrapper">
           <svg class="icon-run" width="14" height="16">
            <use href="./img/sprite.svg#icon-run"></use>
          </svg>
        </div>
        <h3 class="exercise-name">${ex.name}</h3>
      </div>

      <ul class="exercise-details">
        <li class="detail-item">Burned calories: <span class="detail-value">${
          ex.burnedCalories
        } / ${ex.time} min</span></li>
        <li class="detail-item">Body part: <span class="detail-value">${
          ex.bodyPart
        }</span></li>
        <li class="detail-item">Target: <span class="detail-value">${
          ex.target
        }</span></li>
      </ul>
    </div>
  `
    )
    .join('');

  container.innerHTML = markup;
}
