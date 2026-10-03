# Elizabeth Hsu's portfolio

A React and TypeScript website with Overview, Present, Past, and Future views. Built with Vite and Tailwind CSS.

## Development

Install dependencies with `npm ci`, then run `npm run dev`.

## Checks and production build

- `npm run lint` checks the source and configuration.
- `npx tsc --noEmit -p tsconfig.app.json` checks application types.
- `npm run build` creates the production website in `dist`.
- `npm run preview` serves the production build locally.

## Files

- `src/components/views` contains the four views and their styles.
- `src/assets` contains images imported by the application.
- `public` contains the favicon, crawler configuration, and Overview images.
- `src/components/ui/dialog.tsx` provides the Future board image dialog.

The project uses npm; `package-lock.json` records its dependencies. `node_modules` and `dist` are generated and excluded from version control.
