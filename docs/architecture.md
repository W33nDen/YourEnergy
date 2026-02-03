# Архітектура проєкту "Your Energy"

## Поточний стан

Проєкт розгортається на базі шаблону `vanilla-app-template`. Стан: **Готовий до
продакшену (Production Ready)** ✅

## Структура каталогів

- `src/` - вихідний код
  - `css/` - стилі компонентів (BEM)
  - `js/` - модулі JS (API, логіка)
  - `partials/` - HTML фрагменти
  - `img/` - зображення

## Ключові модулі

| Модуль          | Опис                         | Статус |
| --------------- | ---------------------------- | ------ |
| `main.js`       | Точка входу                  | ✅     |
| `api.js`        | Your Energy API              | ✅     |
| `filters.js`    | Muscles/Body parts/Equipment | ✅     |
| `exercises.js`  | Завантаження вправ + пошук   | ✅     |
| `modal.js`      | Модальні вікна + рейтинг     | ✅     |
| `quote.js`      | Цитата дня (API)             | ✅     |
| `storage.js`    | localStorage (favorites)     | ✅     |
| `favorites.js`  | Сторінка улюблених           | ✅     |
| `pagination.js` | Пагінація                    | ✅     |
| `footer.js`     | Підписка на розсилку         | ✅     |
| `toast.js`      | Сповіщення                   | ✅     |

## API Endpoints

Використовується: `https://your-energy.b.goit.study/api`

- `GET /filters` - категорії (Muscles, Body parts, Equipment)
- `GET /exercises` - список вправ
- `GET /exercises/:id` - деталі вправи
- `PATCH /exercises/:id/rating` - додати рейтинг
- `GET /quote` - цитата дня
- `POST /subscription` - підписка email

## Останнє оновлення

- 2026-01-18: Усі функції реалізовані та перевірені
- 2026-01-19: Повне оновлення дизайну за Figma макетом:
  - Шрифт: DM Sans
  - Логотип: YOUR ENERGY (uppercase)
  - Hero: sun icon, кругле фото, hashtags
  - Navigation: pill-shaped buttons з border
  - Social icons: Facebook, Instagram, YouTube
  - Modals: оновлені стилі
  - 2026-01-22: Фіналізація Hero section (Hybrid Layout):
    - Top Row: Title (Left) + Small Image & Hashtags (Right)
    - Bottom: Full-width banner image
    - Navigation: Capsule style (matches Figma Desktop)
  - Privacy/Terms links у footer
- 2026-01-23: Покращення за відгуками ментора:
  - HTML семантика: соціальні мережі в `<ul>/<li>`
  - Бургер-меню: темний фон (#242424) з анімацією
  - Favorites page: унікальний Hero, layout quote+cards
  - Favicon: додано favicon.svg
  - Hover-ефекти: transition на всіх інтерактивних елементах
  - Quote caching: localStorage з перевіркою дати
  - Видалено console.log з production коду
  - Exercises section: додано відсутні іконки (icon-run, icon-quote) у
    sprite.svg
    - Hero Section:
      - Small Image (Decoration): Capsule shape (`border-radius: 60px`)
      - Tags: Transparent buttons with border, Grid layout (2 cols)
      - Star Icon: 16-ray styled starburst (thin stroke)
    - Quote card тепер має іконку біжака зліва та лапки справа
    - Widget (110 min) має чорну іконку біжака
  - Header Navigation:
    - Оновлено соціальні іконки:
      - Header: Black Rounded Squares + White Icons
      - Footer: White Rounded Squares + Black Icons
      - Mobile Menu: White Rounded Squares + Black Icons
  - Footer:
    - Соціальні іконки змінено на filled style (White Box + Black Icon)
  - Favorites Page:
    - Виправлено layout: 2 колонки (Sidebar Left + Content Right)
    - Sidebar містить Quote Card та Row Widgets (110 min + Photo)
    - Content містить адаптивний грід вправ або Empty State
    - Покращено стилі Empty State
- 2026-01-24: Фінальна вичитка стилів:
  - Додано icon-search до sprite.svg для форми пошуку
  - Покращено hover ефекти навігації (subtle background)
  - Збільшено border-radius карток вправ до 20px
  - Додано клас .hidden для утілітарного приховування елементів
- 2026-02-02: Code Review виправлення (критичні помилки):
  - **JS Events**: Слухач Escape тепер додається при відкритті модалки та
    видаляється при закритті (запобігання memory leaks)
  - **JS Events**: Виправлено дублювання слухачів пагінації (видалено з
    `pagination.js`, делегування тепер повністю в `filters.js` та
    `exercises.js`)
  - **Scroll Lock**: Додано `overflow: hidden` на `body` при відкритті модалки
  - **API Error Handling**: Покращено обробку помилок API (статус-код
    зберігається в `error.status`)
  - **Subscription errors**: Коректна обробка 409 Conflict та 400 Bad Request
  - **HTML Semantics**: Картки вправ та категорій тепер рендеряться як
    `<ul>/<li>` замість `<div>`
  - **Email Validation**: Виправлено регулярний вираз email (прибрано зайві
    escape-символи)
  - **Retina Support**: Додано `srcset` (1x/2x) для зображень sidebar
  - **Performance**: Додано `loading="lazy"` для зображень
