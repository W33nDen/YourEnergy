/**
 * Render pagination buttons
 * @param {HTMLElement} container - Container to render buttons in
 * @param {number} totalPages - Total number of pages
 * @param {number} currentPage - Current active page
 *
 * Note: Click handling is done via event delegation in the parent module
 * (filters.js or exercises.js) to prevent listener accumulation.
 */
export function renderPagination(container, totalPages, currentPage = 1) {
  // Hide pagination if only 1 page or less
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let markup = '';

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      const isActive = i === currentPage ? 'active' : '';
      markup += `
        <button class="pagination-btn ${isActive}" type="button" data-page="${i}">
          ${i}
        </button>
      `;
    } else if (
      (i === currentPage - 3 && currentPage > 4) ||
      (i === currentPage + 3 && currentPage < totalPages - 3)
    ) {
      markup += `<span class="pagination-dots">...</span>`;
    }
  }

  container.innerHTML = markup;
}
