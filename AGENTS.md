# Repository Guidelines

## Project Structure & Module Organization

The root contains the static web MVP: `index.html` defines the accessible Portuguese interface, `styles.css` contains responsive styling, and `app.js` provides search, filters, favorites, PDF preview/download, and local upload behavior. `docs/requirements (1).md` records the product requirements, and `docs/Captura de tela 2026-11-24 091049.png` is the prototype reference. Keep project documents and design references in `docs/`.

## Build, Test, and Development Commands

No build step or package installation is needed. Open `index.html` in a browser, or run `python -m http.server 8000` from the repository root and visit `http://localhost:8000` to serve the files locally. Stop the server with Ctrl+C. No automated test command is configured.

## Coding Style & Naming Conventions

Write contributor-facing documentation in concise, direct language. The existing requirements are in Portuguese; preserve that language when editing the requirements unless the maintainers request a translation. Use Markdown headings and lists consistently, and keep filenames descriptive. Avoid changing requirement meaning or turning open questions in the requirements into settled product decisions without team agreement.

## Testing Guidelines

No test framework or coverage target is configured. For interface changes, manually check search, category filters, favorites, preview/download, upload validation, keyboard navigation, and narrow-screen layout in a browser. Keep labels and status messages accessible to screen readers.

## Commit & Pull Request Guidelines

Git history is not available in this working copy, so no repository-specific commit convention can be confirmed. Use a short imperative commit subject that describes the change (for example, `Clarify search requirements`). Pull requests should summarize the change, explain its motivation, link related issues when available, and include screenshots for prototype or interface updates.

## Security & Configuration

Do not commit credentials, personal access tokens, or private user documents. Treat uploaded-file moderation, privacy, copyright, authentication, and storage limits as unresolved product decisions unless requirements are updated to define them.
