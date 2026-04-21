# Project Guidelines

## Code Style

- Use TypeScript and React function components.
- Match the existing Tailwind-first style in `src/`; prefer the theme tokens and utility patterns defined in `src/index.css`.
- Reuse the established UI primitives and composition patterns instead of introducing a new design system.
- Prefer `motion/react` and `lucide-react` in the same style already used by the app.
- Keep component logic small and local unless state truly needs to be shared.

## Architecture

- This is a Vite single-page app.
- Route definitions live in `src/App.tsx`; the authenticated shell lives in `src/layouts/MainLayout.tsx`.
- Global app state is centralized in `src/contexts/AppContext.tsx` and consumed through `src/hooks/useApp.ts`.
- Shared UI building blocks live in `src/components/common/`; feature-specific components live in their own folders.
- When adding or renaming a route, update both `src/App.tsx` and `src/components/Sidebar.tsx`.

## Build and Test

- Install dependencies with `npm install`.
- Run the app with `npm run dev`.
- Build with `npm run build`.
- Type-check with `npm run lint`.
- See `README.md` for the Gemini API key setup used by the app.

## Conventions

- Preserve the app's existing Duolingo-like visual language: `duo-card`, `duo-button`, `quest-*`, and `font-display` / `font-body` are the established patterns.
- Keep new pages and components aligned with the current route/layout structure rather than introducing new routing abstractions.
- Continue using the existing asset reference style already present in the codebase unless you are intentionally standardizing it.
- Prefer extending the current reducer/context model for shared state changes instead of adding a new state library.
- Link to existing documentation rather than duplicating it when more detail is needed.
