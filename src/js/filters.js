import { YourEnergyAPI } from './api.js';
import { loadExercises } from './exercises.js';

const api = new YourEnergyAPI();

// Посилання на DOM елементи
const elements = {
  filtersList: document.querySelector('.filters-list'),
  exercisesContainer: document.getElementById('exercises-container'),
  pagination: document.getElementById('pagination'),
};

// Зберігаємо поточний стан
let currentState = {
  filter: 'Muscles',
  page: 1,
  limit: 12, // Адаптуємо під ширину екрану пізніше, поки 12
};

/**
 * Головна функція ініціалізації фільтрів
 */
export async function initFilters() {
  if (!elements.filtersList) return;

  // 1. Додаємо слухача подій на кнопки фільтрів (делегування)
  elements.filtersList.addEventListener('click', handleFilterClick);

  // 2. Додаємо слухача на контейнер вправ (делегування)
  // Щоб зловити клік по картці категорії
  elements.exercisesContainer.addEventListener('click', handleCategoryClick);

  // 3. Завантажуємо початкові дані (Muscles)
  await loadCategories();
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

  // Оновлюємо стан
  currentState.filter = btn.dataset.filter;
  currentState.page = 1; // Скидаємо на першу сторінку

  // Завантажуємо нові дані
  await loadCategories();
}

/**
 * Завантаження та рендер категорій
 */
async function loadCategories() {
  // Показуємо лоадер (замінюємо контент)
  elements.exercisesContainer.innerHTML =
    '<p class="loader-text">Loading categories...</p>';

  try {
    // Робимо запит на сервер
    const data = await api.getFilters(
      currentState.filter,
      currentState.page,
      currentState.limit
    );

    if (data.results.length === 0) {
      elements.exercisesContainer.innerHTML =
        '<p class="loader-text">Nothing found.</p>';
      return;
    }

    // Рендеримо розмітку
    renderCategoriesMarkup(data.results);

    // Тут пізніше додамо рендер пагінації (data.totalPages)
  } catch (error) {
    console.error(error);
    elements.exercisesContainer.innerHTML =
      '<p class="loader-text" style="color: red">Something went wrong. Try reloading the page.</p>';
  }
}

/**
 * Обробка кліку по картці категорії
 */
async function handleCategoryClick(event) {
  const card = event.target.closest('.category-card');
  if (!card) return; // Клікнули не по картці

  const { filter, name } = card.dataset;

  // Викликаємо завантаження вправ
  // Передаємо назву фільтра (наприклад "Muscles") і назву категорії ("Abs")
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

  // Огортаємо в список або просто дів, залежить від стилів.
  // В CSS ми написали .categories-list, тому використаємо його клас для обгортки або просто вставимо картки
  elements.exercisesContainer.innerHTML = `<div class="categories-list">${markup}</div>`;
}
