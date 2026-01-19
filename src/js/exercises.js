/**
 * Модуль для роботи з вправами
 * Завантаження та рендер вправ по категоріях
 */
import { YourEnergyAPI } from './api.js';
import { renderPagination } from './pagination.js';

const api = new YourEnergyAPI();

// DOM елементи (можуть бути null, якщо сторінка не головна)
const exercisesContainer = document.getElementById('exercises-container');
const pagination = document.getElementById('pagination');
const searchForm = document.getElementById('search-form');
const exercisesTitle = document.querySelector('.exercises-title');

// Стан модуля для завантаження вправ по категорії
let exercisesState = {
  filter: '',
  name: '',
  keyword: '',
  page: 1,
  limit: 10,
};

// Мапа фільтрів для API параметрів
const FILTER_MAP = {
  Muscles: 'muscles',
  'Body parts': 'bodypart',
  Equipment: 'equipment',
};

/**
 * Завантаження вправ за категорією (викликається з filters.js)
 * @param {string} filter - Тип фільтра (Muscles, Body parts, Equipment)
 * @param {string} name - Назва категорії (Abs, Back, Barbell тощо)
 */
export async function loadExercises(filter, name) {
  console.log('🏋️ loadExercises started for:', { filter, name });

  // Update category display (Exercises / Category)
  const currentCategory = document.getElementById('current-category');
  const categorySeparator = document.querySelector(
    '.exercises-category-separator'
  );

  if (currentCategory) {
    currentCategory.textContent = name;
  }
  if (categorySeparator) {
    categorySeparator.classList.add('visible');
  }

  // Show search form
  if (searchForm) {
    searchForm.classList.remove('hidden');
    searchForm.classList.add('visible');
    searchForm.reset();

    // Add search handler (avoid duplication)
    searchForm.removeEventListener('submit', handleSearch);
    searchForm.addEventListener('submit', handleSearch);
  }

  // Оновлюємо стан
  exercisesState.filter = filter;
  exercisesState.name = name;
  exercisesState.keyword = '';
  exercisesState.page = 1;

  // Завантажуємо вправи
  await fetchAndRenderExercises();
}

/**
 * Внутрішня функція для завантаження та рендеру вправ
 */
async function fetchAndRenderExercises() {
  if (!exercisesContainer) {
    console.error('❌ Exercises container not found!');
    return;
  }

  exercisesContainer.innerHTML =
    '<p class="loader-text">Loading exercises...</p>';
  if (pagination) pagination.innerHTML = '';

  try {
    const paramName = FILTER_MAP[exercisesState.filter];
    const params = {
      [paramName]: exercisesState.name.toLowerCase(),
      page: exercisesState.page,
      limit: exercisesState.limit,
    };

    if (exercisesState.keyword) {
      params.keyword = exercisesState.keyword;
    }

    const data = await api.getExercises(params);
    console.log('✅ Exercises data received:', data);

    if (!data.results || data.results.length === 0) {
      exercisesContainer.innerHTML =
        '<p class="loader-text">No exercises found for this category.</p>';
      return;
    }

    renderExercisesMarkup(data.results);

    if (pagination) {
      renderPagination(
        pagination,
        data.totalPages,
        Number(data.page),
        handleExercisePaginationClick
      );
    }
  } catch (error) {
    console.error('❌ Error loading exercises:', error);
    exercisesContainer.innerHTML =
      '<p class="loader-text" style="color: red">Failed to load exercises. Please try again.</p>';
  }
}

/**
 * Рендер карток вправ
 */
function renderExercisesMarkup(exercises) {
  const markup = exercises
    .map(
      ex => `
    <div class="exercise-card" data-id="${ex._id}">
      <div class="exercise-content">
        <div class="exercise-left">
          <div class="exercise-title-box">
            <div class="icon-run-wrapper">
               <svg class="icon-run" width="14" height="16">
                <use href="./img/sprite.svg#icon-run"></use>
              </svg>
            </div>
            <h3 class="exercise-name">${ex.name}</h3>
          </div>
          
          <ul class="exercise-details">
            <li class="detail-item">Burned calories: <span class="detail-value">${ex.burnedCalories} / ${ex.time} min</span></li>
            <li class="detail-item">Body part: <span class="detail-value">${ex.bodyPart}</span></li>
            <li class="detail-item">Target: <span class="detail-value">${ex.target}</span></li>
          </ul>
        </div>
        
        <div class="exercise-right">
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
      </div>
    </div>
  `
    )
    .join('');

  exercisesContainer.innerHTML = markup;
}

/**
 * Обробка пагінації вправ
 */
function handleExercisePaginationClick(event) {
  const btn = event.target.closest('.pagination-btn');
  if (!btn) return;

  const newPage = Number(btn.dataset.page);
  if (newPage === exercisesState.page) return;

  exercisesState.page = newPage;
  fetchAndRenderExercises();

  // Скрол до заголовка
  if (exercisesTitle) {
    exercisesTitle.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Обробка пошуку
 */
async function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const keyword = form.elements.keyword.value.trim();

  exercisesState.keyword = keyword;
  exercisesState.page = 1;

  await fetchAndRenderExercises();
}
