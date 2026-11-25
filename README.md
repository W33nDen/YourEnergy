# YourEnergy

A responsive web app for finding and saving fitness exercises. Built as a personal project during the GoIT JavaScript course.

**Live demo:** https://w33nden.github.io/YourEnergy/

## Features

- Browse exercises by muscle group, body part or equipment
- Search exercises by keyword
- Pagination, with the number of cards adapted to the screen size
- Exercise details in a modal window
- Rate an exercise with stars
- Save favorites in the browser (localStorage) and view them on a separate Favorites page
- Quote of the day from the API, cached per day
- Email subscription form with validation and toast messages
- Responsive layout with Retina images

## Tech stack

- HTML5, CSS3 (Flexbox, Grid, media queries)
- JavaScript (ES6+, modules)
- Vite
- Your Energy REST API (https://your-energy.b.goit.study/api-docs/)

## Project structure

```
src/
├── css/            styles
├── js/             JavaScript modules (api, filters, exercises, modal, favorites, quote, footer)
├── partials/       HTML components
├── img/            images and SVG sprite
├── index.html      home page
└── favorites.html  favorites page
```

## Getting started

Requires Node.js and npm.

```bash
git clone https://github.com/W33nDen/YourEnergy.git
cd YourEnergy
npm install      # install dependencies
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # preview the build locally
```

## Deployment

The site is deployed to GitHub Pages. A GitHub Actions workflow builds the project and publishes `dist/` to the `gh-pages` branch on every push to `main`.

## Author

Denys Uzhvenko, https://github.com/W33nDen
