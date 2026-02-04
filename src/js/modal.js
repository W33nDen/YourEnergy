import { YourEnergyAPI } from './api.js';
import * as storage from './storage.js';
import { showToast } from './toast.js';

const api = new YourEnergyAPI();

const elements = {
  exerciseModalBackdrop: document.querySelector('[data-modal]'),
  exerciseModalContent: document.getElementById('exercise-modal-content'),
  exerciseModalCloseBtn: document.querySelector('[data-modal-close]'),
  ratingModalBackdrop: document.querySelector('[data-rating-modal]'),
  ratingModalContent: document.getElementById('rating-modal-content'),
  ratingModalCloseBtn: document.querySelector('[data-rating-modal-close]'),
  ratingForm: document.getElementById('rating-form'),
  ratingStars: document.getElementById('rating-stars'),
  ratingValueSpan: document.querySelector('.rating-value'),
  exercisesContainer: document.getElementById('exercises-container'),
  favoritesContainer: document.getElementById('favorites-container'),
};

let currentExerciseId = null;
let currentRating = 0;

export function initModals() {
  // Support both exercises and favorites pages
  if (elements.exercisesContainer) {
    elements.exercisesContainer.addEventListener('click', handleCardClick);
  }
  if (elements.favoritesContainer) {
    elements.favoritesContainer.addEventListener('click', handleCardClick);
  }

  if (elements.exerciseModalCloseBtn) {
    elements.exerciseModalCloseBtn.addEventListener(
      'click',
      closeExerciseModal
    );
  }
  if (elements.ratingModalCloseBtn) {
    elements.ratingModalCloseBtn.addEventListener('click', closeRatingModal);
  }
  if (elements.ratingStars) {
    elements.ratingStars.addEventListener('click', handleRatingStarsClick);
  }
  if (elements.ratingForm) {
    elements.ratingForm.addEventListener('submit', handleRatingSubmit);
  }

  // Close with backdrop click (these stay attached - they check visibility internally)
  if (elements.exerciseModalBackdrop) {
    elements.exerciseModalBackdrop.addEventListener(
      'click',
      handleBackdropClick
    );
  }
  if (elements.ratingModalBackdrop) {
    elements.ratingModalBackdrop.addEventListener('click', handleBackdropClick);
  }

  // Note: Escape key listener is added/removed dynamically in open/close functions
}

function handleBackdropClick(event) {
  if (event.target === elements.exerciseModalBackdrop) {
    closeExerciseModal();
  }
  if (event.target === elements.ratingModalBackdrop) {
    closeRatingModal();
  }
}

function handleKeyDown(event) {
  if (event.key === 'Escape') {
    if (!elements.exerciseModalBackdrop.classList.contains('is-hidden')) {
      closeExerciseModal();
    }
    if (!elements.ratingModalBackdrop.classList.contains('is-hidden')) {
      closeRatingModal();
    }
  }
}

async function handleCardClick(event) {
  const startBtn = event.target.closest('.start-btn');
  if (!startBtn) return;

  const exerciseId = startBtn.dataset.id;
  if (exerciseId) {
    await openExerciseModal(exerciseId);
  }
}

async function openExerciseModal(exerciseId) {
  currentExerciseId = exerciseId;
  elements.exerciseModalContent.innerHTML =
    '<p class="loader-text">Loading exercise details...</p>';
  elements.exerciseModalBackdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden'; // Prevent background scroll

  // Add Escape key listener when modal opens
  document.addEventListener('keydown', handleKeyDown);

  try {
    const exerciseDetails = await api.getExerciseById(exerciseId);
    renderExerciseDetails(exerciseDetails);
  } catch (error) {
    elements.exerciseModalContent.innerHTML =
      '<p class="loader-text" style="color: red">Failed to load exercise details.</p>';
  }
}

function closeExerciseModal() {
  elements.exerciseModalBackdrop.classList.add('is-hidden');
  elements.exerciseModalContent.innerHTML = ''; // Clear content
  currentExerciseId = null;
  document.body.style.overflow = ''; // Restore scroll

  // Remove Escape key listener when modal closes (if rating modal is also closed)
  if (elements.ratingModalBackdrop.classList.contains('is-hidden')) {
    document.removeEventListener('keydown', handleKeyDown);
  }
}

function renderStars(rating) {
  let starsMarkup = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsMarkup += `<svg class="star-icon filled" width="14" height="14"><use href="/YourEnergy/sprite.svg#icon-star"></use></svg>`;
    } else if (hasHalfStar && i === fullStars) {
      // This template doesn't have half stars, so we'll just use full for simplicity or leave empty
      starsMarkup += `<svg class="star-icon" width="14" height="14"><use href="/YourEnergy/sprite.svg#icon-star"></use></svg>`;
    } else {
      starsMarkup += `<svg class="star-icon" width="14" height="14"><use href="/YourEnergy/sprite.svg#icon-star"></use></svg>`;
    }
  }
  return starsMarkup;
}

function renderExerciseDetails(exercise) {
  const isFav = storage.isFavorite(exercise._id);
  const favBtnText = isFav ? 'Remove from favorites' : 'Add to favorites';

  const markup = `
    <div class="modal-exercise-card">
      <!-- Left Column: Image -->
      <div class="modal-image-wrap">
        <img class="modal-exercise-img" src="${exercise.gifUrl}" alt="${exercise.name}">
      </div>
      
      <!-- Right Column: Content -->
      <div class="modal-exercise-info">
        <h3 class="modal-exercise-name">${exercise.name}</h3>
        <div class="modal-rating-wrap">
          <span class="modal-rating-value">${exercise.rating.toFixed(1)}</span>
          <div class="modal-stars">
            ${renderStars(exercise.rating)}
          </div>
        </div>
        
        <!-- Stats Grid -->
        <div class="modal-stats-grid">
          <div class="modal-stat-item">
            <span class="modal-stat-label">Target</span>
            <span class="modal-stat-value">${exercise.target}</span>
          </div>
          <div class="modal-stat-item">
            <span class="modal-stat-label">Body Part</span>
            <span class="modal-stat-value">${exercise.bodyPart}</span>
          </div>
          <div class="modal-stat-item">
            <span class="modal-stat-label">Equipment</span>
            <span class="modal-stat-value">${exercise.equipment}</span>
          </div>
          <div class="modal-stat-item">
            <span class="modal-stat-label">Popular</span>
            <span class="modal-stat-value">${exercise.popularity}</span>
          </div>
        </div>
        
        <!-- Burned Calories - Separate -->
        <div class="modal-calories">
          <span class="modal-calories-label">Burned calories</span>
          <span class="modal-calories-value">${exercise.burnedCalories}/${exercise.time} min</span>
        </div>
        
        <!-- Description -->
        <p class="modal-exercise-description">${exercise.description}</p>
        
        <!-- Buttons -->
        <div class="modal-buttons">
          <button class="add-to-favorites-btn" type="button" data-id="${exercise._id}">
            ${favBtnText}
            <svg class="heart-icon" width="18" height="18">
              <use href="/YourEnergy/sprite.svg#icon-heart"></use>
            </svg>
          </button>
          <button class="give-rating-btn" type="button" data-id="${exercise._id}">Give a rating</button>
        </div>
      </div>
    </div>
  `;
  elements.exerciseModalContent.innerHTML = markup;

  const giveRatingBtn =
    elements.exerciseModalContent.querySelector('.give-rating-btn');
  if (giveRatingBtn) {
    giveRatingBtn.addEventListener('click', openRatingModal);
  }

  // Add to favorites button logic
  const addBtn = elements.exerciseModalContent.querySelector(
    '.add-to-favorites-btn'
  );
  if (addBtn) {
    addBtn.addEventListener('click', () =>
      handleFavoriteToggle(exercise, addBtn)
    );
  }
}

function handleFavoriteToggle(exercise, button) {
  const isFav = storage.isFavorite(exercise._id);
  const heartIcon = `<svg class="heart-icon" width="18" height="18"><use href="/YourEnergy/sprite.svg#icon-heart"></use></svg>`;

  if (isFav) {
    storage.removeFavoriteId(exercise._id);
    showToast('Removed from favorites', 'success');
    button.innerHTML = `Add to favorites ${heartIcon}`;
  } else {
    storage.addFavoriteId(exercise._id);
    showToast('Added to favorites!', 'success');
    button.innerHTML = `Remove from favorites ${heartIcon}`;
  }
}

function openRatingModal() {
  if (!currentExerciseId) return;

  // Close exercise modal but keep currentExerciseId
  const savedExerciseId = currentExerciseId;
  elements.exerciseModalBackdrop.classList.add('is-hidden');
  elements.exerciseModalContent.innerHTML = '';
  currentExerciseId = savedExerciseId;

  elements.ratingModalBackdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden'; // Keep scroll locked
  currentRating = 0; // Reset rating
  updateRatingStars();
  elements.ratingForm.reset();

  // Ensure Escape listener is attached
  document.addEventListener('keydown', handleKeyDown);
}

function closeRatingModal() {
  elements.ratingModalBackdrop.classList.add('is-hidden');
  currentExerciseId = null;
  document.body.style.overflow = ''; // Restore scroll

  // Remove Escape key listener when modal closes
  document.removeEventListener('keydown', handleKeyDown);
}

function handleRatingStarsClick(event) {
  const star = event.target.closest('.star-icon');
  if (!star) return;

  currentRating = parseInt(star.dataset.rating);
  updateRatingStars();
}

function updateRatingStars() {
  const stars = elements.ratingStars.querySelectorAll('.star-icon');
  elements.ratingValueSpan.textContent = currentRating.toFixed(1);

  stars.forEach((star, index) => {
    if (index < currentRating) {
      star.classList.add('filled');
    } else {
      star.classList.remove('filled');
    }
  });
}

async function handleRatingSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.ratingForm);
  const email = formData.get('email');
  const review = formData.get('review');

  if (!currentExerciseId || currentRating === 0 || !email) {
    showToast('Please provide a rating and your email.', 'error');
    return;
  }

  const exerciseIdToReopen = currentExerciseId;

  try {
    await api.patchRating(currentExerciseId, {
      rate: currentRating,
      email,
      review,
    });
    showToast('Thank you for your rating!', 'success');
    closeRatingModal();
    // Re-open exercise modal with updated rating
    await openExerciseModal(exerciseIdToReopen);
  } catch (error) {
    if (error.status === 409) {
      showToast('You have already rated this exercise.', 'info');
    } else {
      showToast(
        'Failed to submit rating. ' + (error.message || 'Please try again.'),
        'error'
      );
    }
  }
}
