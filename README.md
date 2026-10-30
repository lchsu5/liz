# Elizabeth Hsu's Portfolio

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
- `CLEANUP_AUDIT.md` documents verified unused code and cleanup validation.

The project uses npm; `package-lock.json` records its dependencies. `node_modules` and `dist` are generated and excluded from version control.

## CMUsed prototype

The Overview CMUsed project section includes a clickable walkthrough of the supplied Figma screen exports. Every screen uses the same fixed preview box without internal scrolling. Reviewed SVG viewBox crops remove repeated rows, footers, or empty space while keeping the primary controls visible; clickable regions scale with each image. Demo forms appear inside the frame. Start at sign-in and click through the screens to explore. The heading updates with the current screen; Back and Restart let you retrace the flow.

The walkthrough scales the desktop designs to fit on small screens. Search opens sample results; messages and listing forms are session-only demonstrations without authentication or a backend. Optimized screen images are in `public/cmused`; the original ZIP is not included. Both HTML entry points are included in the production build and existing GitHub Pages deployment workflow.
