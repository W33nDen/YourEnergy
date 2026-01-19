import { YourEnergyAPI } from './api.js';
import { loadExercises } from './exercises.js';
import { renderPagination } from './pagination.js';

const api = new YourEnergyAPI();

// Посилання на DOM елементи
const elements = {
  filtersList: document.getElementById('filters-list'),
  exercisesContainer: document.getElementById('exercises-container'),
  pagination: document.getElementById('pagination'),
  currentCategory: document.getElementById('current-category'),
  categorySeparator: document.querySelector('.exercises-category-separator'),
  searchForm: document.getElementById('search-form'),
};

// Зберігаємо поточний стан
let currentState = {
  filter: 'Muscles',
  page: 1,
  limit: 12,
};

/**
 * Головна функція ініціалізації фільтрів
 */
export async function initFilters() {
  console.log('🔧 initFilters started');
  if (!elements.filtersList) return;

  // 1. Додаємо слухача подій на кнопки фільтрів (делегування)
  elements.filtersList.addEventListener('click', handleFilterClick);

  // 2. Додаємо слухача на контейнер вправ (делегування)
  elements.exercisesContainer.addEventListener('click', handleCategoryClick);

  // 3. Додаємо слухача на пагінацію
  if (elements.pagination) {
    elements.pagination.addEventListener('click', handlePaginationClick);
  }

  // 4. Load categories by default on page load
  await loadCategories();
}

/**
 * Load default exercises to show on page load
 */
async function loadDefaultExercises() {
  console.log('🏋️ loadDefaultExercises started');

  if (!elements.exercisesContainer) {
    console.error('❌ Exercises container not found!');
    return;
  }

  // Show loading
  elements.exercisesContainer.innerHTML =
    '<p class="loader-text">Loading...</p>';

  try {
    const data = await api.getExercises({ limit: 10 });
    console.log('✅ Exercises data received:', data);

    // Clear loading
    elements.exercisesContainer.innerHTML = '';

    // Check if results exist
    if (!data.results || data.results.length === 0) {
      elements.exercisesContainer.innerHTML =
        '<p class="loader-text">No exercises found</p>';
      return;
    }

    // Create cards
    data.results.forEach(exercise => {
      const card = createExerciseCard(exercise);
      elements.exercisesContainer.insertAdjacentHTML('beforeend', card);
    });

    console.log('✅ Default exercises rendered');
  } catch (error) {
    console.error('❌ Error loading exercises:', error);
    elements.exercisesContainer.innerHTML =
      '<p class="loader-text">Failed to load exercises</p>';
  }
}

function createExerciseCard(exercise) {
  return `
    <div class="exercise-card" data-id="${exercise._id}">
      <div class="exercise-content">
        <div class="exercise-left">
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
              Burned calories: <span class="detail-value">${exercise.burnedCalories}</span>
            </li>
            <li class="detail-item">
              Body part: <span class="detail-value">${exercise.bodyPart}</span>
            </li>
            <li class="detail-item">
              Target: <span class="detail-value">${exercise.target}</span>
            </li>
          </ul>
        </div>
        <div class="exercise-right">
          <span class="workout-badge">WORKOUT</span>
          <div class="rating-wrap">
            <span>${exercise.rating.toFixed(1)}</span>
            <svg width="14" height="14">
              <use href="./img/sprite.svg#icon-star"></use>
            </svg>
          </div>
          <button class="start-btn" data-id="${exercise._id}">
            Start
            <svg width="14" height="14">
              <use href="./img/sprite.svg#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Обробка кліку по фільтру
 */
async function handleFilterClick(event) {
  const btn = event.target.closest('.filters-btn');
  if (!btn) return;

  // Якщо клікнули по вже активному фільтру - нічого не робимо
  if (btn.classList.contains('active')) return;

  // Змінюємо активний клас
  document.querySelector('.filters-btn.active')?.classList.remove('active');
  btn.classList.add('active');

  // Hide category name and search when switching filters
  if (elements.currentCategory) elements.currentCategory.textContent = '';
  if (elements.categorySeparator)
    elements.categorySeparator.classList.remove('visible');
  if (elements.searchForm) elements.searchForm.classList.remove('visible');

  // Оновлюємо стан
  currentState.filter = btn.dataset.filter;
  currentState.page = 1;

  // Завантажуємо категорії
  await loadCategories();
}

/**
 * Обробка кліку по пагінації
 */
async function handlePaginationClick(event) {
  const btn = event.target.closest('.pagination-btn');
  if (!btn) return;

  const newPage = Number(btn.dataset.page);
  if (newPage === currentState.page) return;

  currentState.page = newPage;
  await loadCategories();
}

/**
 * Завантаження та рендер категорій
 */
async function loadCategories() {
  console.log('📂 Loading categories for:', currentState.filter);

  // Show loading
  elements.exercisesContainer.innerHTML =
    '<p class="loader-text">Loading categories...</p>';

  try {
    const data = await api.getFilters(
      currentState.filter,
      currentState.page,
      currentState.limit
    );

    console.log('✅ Categories data received:', data);

    if (data.results.length === 0) {
      elements.exercisesContainer.innerHTML =
        '<p class="loader-text">Nothing found.</p>';
      elements.pagination.innerHTML = '';
      return;
    }

    // Render categories
    renderCategoriesMarkup(data.results);

    // Render pagination
    renderPagination(elements.pagination, data.totalPages, Number(data.page));
  } catch (error) {
    console.error('❌ Error loading categories:', error);
    elements.exercisesContainer.innerHTML =
      '<p class="loader-text" style="color: red">Something went wrong. Try reloading page.</p>';
    elements.pagination.innerHTML = '';
  }
}

/**
 * Обробка кліку по картці категорії
 */
async function handleCategoryClick(event) {
  // Перевіряємо чи це клік по картці категорії
  const card = event.target.closest('.category-card');
  if (!card) return;

  const { filter, name } = card.dataset;
  console.log('🏋️ Category clicked:', { filter, name });

  // Hide pagination
  elements.pagination.innerHTML = '';

  // Load exercises for this category
  await loadExercises(filter, name);
}

/**
 * Створення HTML розмітки для списку категорій
 */
function renderCategoriesMarkup(results) {
  const markup = results
    .map(
      item => `
    <div class="category-card" 
         data-name="${item.name}" 
         data-filter="${item.filter}">
      <img class="category-img" src="${item.imgURL}" alt="${item.name}" loading="lazy">
      <div class="category-info">
        <h3 class="category-title">${item.name}</h3>
        <p class="category-filter">${item.filter}</p>
      </div>
    </div>
  `
    )
    .join('');

  elements.exercisesContainer.innerHTML = `<div class="categories-list">${markup}</div>`;
}
