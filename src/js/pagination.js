/**
 * Render pagination buttons
 * @param {HTMLElement} container - Container to render buttons in
 * @param {number} totalPages - Total number of pages
 * @param {number} currentPage - Current active page
 * @param {Function} onPageChange - Callback function for page change
 */
export function renderPagination(
  container,
  totalPages,
  currentPage = 1,
  onPageChange = null
) {
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

  // Attach click handler if provided
  if (onPageChange && typeof onPageChange === 'function') {
    container.addEventListener('click', onPageChange);
  }
}
