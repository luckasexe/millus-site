# Repository Guidelines

## Project Structure & Module Organization
This project now uses React with Vite as a single-page app. Application code lives in `src/`: `main.jsx` boots the app, `App.jsx` defines routes, `components/` holds shared layout pieces, and `pages/` contains page-level views. Static files that must ship as-is live in `public/`, including `assets/` images and QR redirect pages under `public/qr/`.

## Build, Test, and Development Commands
Install dependencies once with `npm install`. Use `npm run dev` for local development, `npm run build` for the production bundle, and `npm run preview` to verify the built output locally. Vite serves the app with hash-based routing, so the ethics page is available at `/#/etica`.

## Coding Style & Naming Conventions
Use 2-space indentation in JSX, JS, and config files. Prefer functional React components, descriptive PascalCase component names such as `SiteLayout`, and keep route/page files in `src/pages`. Reuse the design tokens in `src/styles.css` before introducing new colors, spacing, or shadows. Keep visible copy in Brazilian Portuguese unless a change explicitly requires another language.

## Testing Guidelines
There is no automated test suite yet. Run `npm run build` before submitting changes, then manually verify the home page, `/#/etica`, and the static redirects in `/qr/maps/` and `/qr/zap/`. Check desktop and mobile layouts, external links, and image paths under `/assets/`.

## Commit & Pull Request Guidelines
Recent history uses short messages with prefixes like `[fix]`, `[feat]`, `NEW:`, and `new:`. Prefer a consistent lowercase style such as `[feat] migrate site to react`. Keep commits focused and include screenshots in PRs for visual changes. If a PR changes contact info, addresses, or redirect targets, call that out explicitly in the description.

## Deployment Notes
Keep compatibility files such as `public/etica.html` and the QR redirects aligned with the React routes. When updating assets, place optimized files in `public/assets/` and reference them with absolute paths like `/assets/logo.png`.
