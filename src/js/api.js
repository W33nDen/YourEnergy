/**
 * Клас для взаємодії з Your Energy API
 * Документація: https://your-energy.b.goit.study/api-docs/
 */
export class YourEnergyAPI {
  #BASE_URL = 'https://your-energy.b.goit.study/api';

  /**
   * Універсальний метод для виконання запитів
   * @param {string} endpoint - частина URL після base
   * @param {object} options - налаштування запиту (method, headers, body)
   */
  async #fetchData(endpoint, options = {}) {
    const url = `${this.#BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, options);

      // Якщо статус не ОК (не 200-299), кидаємо помилку з кодом статусу
      if (!response.ok) {
        const error = new Error(
          `API Error: ${response.status} ${response.statusText}`
        );
        error.status = response.status; // Зберігаємо код статусу для обробки
        throw error;
      }

      return await response.json();
    } catch (error) {
      // Прокидаємо помилку далі, щоб обробити її в UI
      throw error;
    }
  }

  /**
   * Отримання цитати дня
   * GET /quote
   */
  async getQuote() {
    return this.#fetchData('/quote');
  }

  /**
   * Отримання списку фільтрів (категорій)
   * GET /filters
   * @param {string} filter - 'Muscles', 'Body parts', 'Equipment'
   * @param {number} page
   * @param {number} limit
   */
  async getFilters(filter = 'Muscles', page = 1, limit = 12) {
    // Формуємо параметри запиту
    const params = new URLSearchParams({
      filter,
      page,
      limit,
    });
    return this.#fetchData(`/filters?${params}`);
  }

  /**
   * Отримання вправ
   * GET /exercises
   * @param {object} params - { bodypart, muscles, equipment, keyword, page, limit }
   */
  async getExercises({
    bodypart = '',
    muscles = '',
    equipment = '',
    keyword = '',
    page = 1,
    limit = 10,
  } = {}) {
    const searchParams = new URLSearchParams({
      page,
      limit,
    });

    // Додаємо тільки ті параметри, які існують (не пусті)
    if (bodypart) searchParams.append('bodypart', bodypart);
    if (muscles) searchParams.append('muscles', muscles);
    if (equipment) searchParams.append('equipment', equipment);
    if (keyword) searchParams.append('keyword', keyword);

    return this.#fetchData(`/exercises?${searchParams}`);
  }

  /**
   * Отримання деталей однієї вправи
   * GET /exercises/{id}
   * @param {string} id
   */
  async getExerciseById(id) {
    return this.#fetchData(`/exercises/${id}`);
  }

  /**
   * Додавання рейтингу вправі
   * PATCH /exercises/{id}/rating
   * @param {string} id
   * @param {object} data - { rate: number, email: string, review: string }
   */
  async patchRating(id, data) {
    return this.#fetchData(`/exercises/${id}/rating`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  /**
   * Оформлення підписки
   * POST /subscription
   * @param {string} email
   */
  async createSubscription(email) {
    return this.#fetchData('/subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  }
}
