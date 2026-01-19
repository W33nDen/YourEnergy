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
- 2026-01-19: Pixel-perfect виправлення:
  - Container width: 1440px (було 1200px)
  - Navigation: dark background (#242424), light active button
  - Nav font-size: 16px
  - Hashtags: solid white background (#FFFFFF)
  - Sun icon: multi-pointed star 59x59 inline
  - Footer: serif heading (Playfair Display), two-row layout
  - WORKOUT badge: yellow/orange outline (#EEA10C)
  - Privacy/Terms links у footer
