# Cleanup audit

Audited the current working tree on 2026-10-03 **before deleting anything**. Existing uncommitted overview, cursor-trail, and transition changes are the baseline and are preserved. The before-change source, assets, production build, and diff are saved locally in ignored `node_modules/.cleanup-baseline` for comparison.

## Verification method

- Enumerated all project files, including hidden configuration, excluding generated `node_modules`, `dist`, and Git internals from runtime reference searches.
- Followed the import graph from `index.html` → `src/main.tsx` → `App.tsx` → both routes. Followed every import from `Index.tsx`, including all four switch cases and both overview hooks.
- Checked `import()`, `import.meta`, `require()`, glob patterns, `new URL`, fetch calls, CSS `url()`, literal asset paths, DOM selectors, class assignments, and dynamically constructed IDs/classes. There are no dynamic module imports, glob imports, or string-driven component loaders in the application.
- Checked package imports in source **and** Vite, Tailwind, PostCSS, ESLint, TypeScript configuration and npm scripts. A package used by configuration or a command is not an unused dependency.
- Read every stylesheet and checked scoped selectors against their owning view and its DOM-producing effects, including responsive and reduced-motion rules.
- Baseline production build, ESLint, and TypeScript with `--noUnusedLocals --noUnusedParameters` pass. The Windows sandbox blocks esbuild directory traversal, so the production build requires normal filesystem access; no application configuration changes are needed.

## a) Unreachable files

| Item | Evidence | Action |
| --- | --- | --- |
| `src/components/ui/dialog.tsx` | No source, route, dynamic import, or component lookup references this module or its exports. `VisionBoardView` renders boards directly, without a dialog. README's claim that it provides a Future dialog is stale documentation, not runtime usage. | Delete and correct the README entry. |
| `src/lib/utils.ts` | Its only importer is the unreachable dialog. No other calls to `cn` or references to this module exist. | Delete with the dialog. |

No unused pages, active hooks, or stylesheet files were found. `NotFound.tsx` is used by the `*` route. `navigation.ts` supplies the shared view type. `vite-env.d.ts` is included by TypeScript without an explicit import.

## b) Unreferenced images, videos, and fonts

**None. All 29 content images and the favicon are used.** There are no local videos or font files.

| Files | Verified runtime reference |
| --- | --- |
| `public/overview-reference/elizabeth-pink-wall.jpeg` | Hero image in `OverviewView.tsx` and literal `mainPhoto` in the rotating strip effect. |
| `public/overview-reference/photo-2.jpg`, `photo-3.jpg`, `photo-4.jpg` | Three campus-leadership cards in `OverviewView.tsx`. |
| `src/assets/a.jpg`, `b.jpg`, `c.jpg`, `d.jpg`, `e.jpg` | Imported in `useOverviewEffects.ts`, placed in `rotatingPhotos`, and assigned to dynamically created strip images. |
| `src/assets/1.1.JPG`, `1.2.jpeg`, `1.3.JPG`, `1.4.png` | Imported in `useHeroPhotoTrail.ts` (including the `?url` imports), decoded and placed in the eight cursor-trail cards. |
| `src/assets/cmucampus.jpg` | Overview education image. |
| `src/assets/photo-graduation.jpg`, `photo-tie-shadow-day.png`, `photo-group.jpeg`, `eaton.jpg` | `BeforeView.tsx` archive array mapped to the interactive photo grid. |
| `src/assets/handshake.jpg`, `cmu.png`, `superworld.jpg`, `consortium.jpg`, `project-destined-logo.png`, `ey.jpg`, `deliotte.jpg`, `kumon.jpg` | `BeforeView.tsx` past-role data mapped to role logos, including filtered results. The misspelled `deliotte.jpg` is used. |
| `src/assets/vision-board-2026.jpg`, `vision-board-summer-2026.jpg`, `vision-board-fall-2026.jpg` | `VisionBoardView.tsx` boards array mapped to three sections and bookmark buttons. |
| `public/favicon.ico` | `index.html` icon link. |

`public/robots.txt` is a conventional crawler endpoint and is kept despite having no source import. External social-preview images in `index.html` are used metadata and are kept.

## c) Unused code inside reachable files

| Item | Evidence | Action |
| --- | --- | --- |
| `useOverviewEffects.ts`: `navigateRef`, its assignments, and returned navigation wrapper | The only call to `useOverviewEffects` discards its return value. No effect listener calls `navigateRef`. Thus the assigned navigation function and returned wrapper cannot be invoked. | Delete that unused callback plumbing only. |
| `useOverviewEffects.ts`: `onNavigate` parameter; `OverviewView.tsx`: `onNavigate` prop; `Index.tsx`: that prop at the Overview call site | Their only consumer is the dead callback above. Actual navigation is handled by `ViewNavigation`, which remains intact. | Delete these now-unused props/parameters and their type/ref imports. |
| `BeforeView.tsx`: `year` property in the private `past` data type and eight role objects | No code reads `role.year`, destructures `year`, spreads the objects into another consumer, serializes them, or constructs property accesses. Displayed dates use the separate `dates` field. | Delete only the unused metadata. |

No other unused imports, local variables, function declarations, or props were reported by TypeScript's unused checks. Hooks, listeners, timers, observers, animation helpers, keyboard handlers, and all displayed role/story/board data are used.

## d) Unused npm dependencies

| Package | Evidence | Action |
| --- | --- | --- |
| `@radix-ui/react-dialog` | Imported only by the unreachable dialog; no config/script usage. | Remove. |
| `lucide-react` | Imported only for the dialog's close icon; no other source/config/script usage. | Remove. |
| `clsx` | Imported only by unreachable `lib/utils.ts`. | Remove. |
| `tailwind-merge` | Imported only by unreachable `lib/utils.ts`. | Remove. |
| `tailwindcss-animate` | Imported by Tailwind config, so **not** classified as never imported. Its generated `animate-in`/`animate-out` and related utilities are used only by the unreachable dialog. Live animations use Framer Motion, scoped CSS keyframes, or Web Animations. | Remove unused plugin registration and package together. |

All other dependencies and development dependencies have a runtime, configuration, npm-script, or TypeScript declaration consumer and are kept. In particular, keep Framer Motion, React Router, Tailwind, and the development-mode `lovable-tagger` plugin.

## e) Unused scaffolded UI components

The sole scaffolded UI file is `dialog.tsx`. Its `Dialog`, `DialogPortal`, `DialogOverlay`, `DialogContent`, and `DialogTitle` are used only within that unreachable file or exported without a consumer. Delete the file, as recorded in (a). No other UI-library component files exist.

## f) Unused CSS, keyframes, and duplicate styles

These entries are all **inside `@scope (.overview-reference)` in `OverviewView.css`**, so similarly named classes in Present or the 404 page do not make them live:

| Selector family (including descendant, hover, and media-rule variants) | Evidence | Action |
| --- | --- | --- |
| `#hd`, `#nav`, `.nv`, `.nv.act` | No overview element or dynamically created element has these IDs/classes. Real navigation uses `.view-navigation` outside this scope. | Delete only these legacy selectors. |
| `.sec`, `#rev`, `.lk`, `.lk b` | No matching overview markup or effect-created DOM. Present's `.sec` lives in a different scope. | Delete. |
| `.edu h2`, `.edu p`, `.edu .bn`, `.edu .bn img` | No `.edu`/`.bn` elements; the live education section uses `#education`, `.eb`, `.tx`, and `.dg`. | Delete. |
| `.ent` and all `.ent` descendants/hover variants | No `.ent` elements; the live leadership cards use `.lc`. | Delete. |
| `.em`, `.em:hover`, `.tiles`, `.tile`, `.tile:hover`, `.ic` | No matching overview markup/effect-created DOM. Present's `.ic` is separately scoped and kept. | Delete. |
| `#pool` | Neither hook creates an element with this ID; the trail pool creates `.hero-trail-card` elements. | Delete. |
| `.lr`, `.lr .r` | No matching overview DOM or dynamic class assignment. | Delete responsive/reduced-motion selectors only. |
| `#wp` | The empty node is permanently `visibility:hidden`, translated offscreen, fixed, and noninteractive. No code references its ID or changes its content/style. | Delete this unused hidden overlay node and its rule. |

Keep all live keyframes: `mq` (dynamic photo strip), `contact-reveal` (observer-driven contact reveal), `present-fade` (story tabs), and `past-fade` (filtered roles). No unused handwritten keyframes were found. Tailwind animation-plugin utilities become unused after deleting the dialog and are removed with the plugin.

The identical Inter Tight font import is duplicated in Overview and Present. Consolidate it into one global import. Used Inter Tight weights are 400/500; 600 occurs only in the dead overview `.ic` rule. DM Sans uses 400/500; no live selectors/markup request 200/300/600. Keep DM Serif Display 400 for headings and the 404 route.

## g) Logs, commented-out code, and old component versions

- No `console.log` statements or commented-out implementation blocks were found.
- Keep the active `console.error` in the 404 route: it records an attempted nonexistent route and is not dead code.
- No duplicate/old component files were found beyond the unreachable scaffolded dialog and the legacy CSS/overlay recorded above.
- Keep explanatory comments and the Future board-extension comment; they are useful documentation.

## Conservative keep/skip decisions

- Keep global typography, palette variables, Tailwind theme settings/utilities, print rules, and the 404 card styles. Defaults, inheritance, generated utilities, and the fallback route make aggressive deletion unsafe or unnecessary.
- Keep configuration/editor files and generated ignored folders; lack of a source import does not establish that tooling files are dead.
- Preserve all active animation logic, the cursor-trail pool/decoding, photo-strip ordering, scroll behavior, links, copy, sections, layout, and responsive/reduced-motion handling.
- Treat image optimization as an explicit performance change, not an unused-asset deletion. Retain originals until replacements are validated. Skip any resize/conversion that compromises displayed detail, transparency, orientation, or aspect ratio; vision boards contain fine text and need particular care.

## Implemented cleanup and performance changes

- Deleted the two unreachable code files listed in (a), the unused callback/prop chain, eight `year` metadata fields, the hidden `#wp` node, and 44 dead overview selector entries (count includes comma-separated and media-rule variants).
- Removed five direct dependencies and 24 now-unneeded transitive packages (29 total lockfile entries). Remaining package versions were not changed. The temporary image/browser tools are local, ignored validation tools; they were not added to `package.json` or the project lockfile.
- Consolidated the two identical Inter Tight imports into one global import and removed its unused 600 weight.
- Retained the original DM Sans font request after a reduced-weight request produced slight text rasterization differences in screenshot comparisons. Its 200/300/600 weights have no explicit application consumer, but visual preservation takes priority over deleting that request range.
- Added lazy loading to the Overview education/team images, Past role logos after the first three visible entries, and the second/third Future boards. Hero and cursor-trail images remain eager. Reserved the lazy boards' existing aspect ratios using their source dimensions so bookmark scrolling retains the correct geometry before loading.
- Converted four PNGs to **lossless WebP at their original resolutions**, preserving transparency and the embedded profile where present. Standalone Chrome image comparisons at 1× and 2× pixel density found **zero pixel differences** for all four final conversions.

| Original file replaced | Replacement | Dimensions preserved | Before → after |
| --- | --- | --- | --- |
| `src/assets/1.4.png` | `src/assets/1.4.webp` | 748 × 1006 | 1,574,124 → 915,598 bytes |
| `src/assets/cmu.png` | `src/assets/cmu.webp` | 600 × 600 | 20,857 → 6,606 bytes |
| `src/assets/photo-tie-shadow-day.png` | `src/assets/photo-tie-shadow-day.webp` | 1444 × 982 | 2,713,230 → 1,474,170 bytes |
| `src/assets/project-destined-logo.png` | `src/assets/project-destined-logo.webp` | 224 × 224 | 3,866 → 3,174 bytes |

The original PNG files were replaced, not discarded as unused artwork. Image content is preserved. These conversions save **1,912,529 bytes (about 1.91 MB / 1.82 MiB)**.

### Image optimizations deliberately skipped

- Kept `a.jpg`, `b.jpg`, `c.jpg`, `d.jpg`, `e.jpg`, `1.2.jpeg`, and `photo-group.jpeg` unchanged after browser comparisons showed that resized versions changed rendered detail. The trial resize of `1.4.png` was also rejected; its final WebP retains the full resolution.
- Kept the full-resolution hero, all three text-rich vision boards, `1.1.JPG`, `1.3.JPG`, `cmucampus.jpg`, `eaton.jpg`, `photo-graduation.jpg`, all three public team photos, and the remaining JPEG logos. Trial lossless WebP encodings were larger than these originals. Resizing or lossy recompression could affect detail and was skipped.
- Kept the favicon, crawler endpoint, external metadata images, active 404 diagnostic, global typography/theme/print defaults, tooling configuration, and all active interactions as described above.

### Verification

- Production build, ESLint, TypeScript unused-local/parameter checks, dependency-tree validation, and `git diff --check` pass.
- Compared all four views and the 404 route at 1440 × 900 and 390 × 844 against the saved working-tree baseline, including copy, links, accessibility attributes, element bounds, and computed typography/layout/color styles.
- Exercised all four nav buttons and the site-name home button, scroll reset/progress, both Present accordions, all story tabs and keyboard arrows/Home, all five Past filters and role accordions, photo focus/hover behavior, all three Future bookmarks, and the 404 home link.
- With normal motion enabled, exercised the cursor-trail pool, hero shrinking, 24-image rotating strip, contact reveal/scramble, leadership hover scaling, click particles, page navigation, and story fade animations. Also checked real lazy-image scrolling and confirmed hero/trail images are not lazy.
- No browser JavaScript errors or failed local asset requests occurred. External contact/project destinations were verified against unchanged `href` values; mail clients and external services were not invoked.
- The animation plugin removal changes a computed animation-duration default on the 404 link; it has no animation name and no observable animation. Its hover color transition and rendered appearance are preserved.
- Full-page captures can differ slightly in browser JPEG downsampling/rasterization despite unchanged originals. They are not claimed to be globally byte-identical screenshots; the four converted assets were separately verified pixel-identical at their display sizes.

Local comparison artifacts and scripts remain ignored under `node_modules/.cleanup-baseline` and `node_modules/.cleanup-tools`; they do not ship in the build.
