# Invest Smarter with AI visual MVP

Astro and TypeScript generate static HTML for marketing. One React root provides the internal lesson fixture. Ordinary CSS preserves the current visual identity. Use Node.js 22.19 or later and run `npm ci`.

Run `npm run dev` and open http://localhost:3000. Astro reloads edited pages and content during development. The public routes remain `/`, `/programa`, `/nosotros` and `/cursos/000`.

Run `npm run lint` for Astro and TypeScript validation, `npm test` for content and domain tests, `npm run build` for static output, and `npm run test:routes` against that output. `npm run test:e2e` starts a separate development server and tests navigation, hydration, no-JavaScript reading, mobile layouts and reduced motion. Browser tests use installed Google Chrome; install Chrome or change the Playwright channel for your environment.

The internal fixture is `/cursos/000/lecciones/fixture-interna`. It is available in development, unlinked from marketing, and excluded from normal production builds. For an explicit internal build, set `INCLUDE_INTERNAL_FIXTURES=true` before `npm run build`, then run `npm run preview`. Clear the variable and rebuild before public deployment. Noindex metadata does not provide access control; the fixture is not private if its preview output is hosted publicly.

Brand settings live in `src/config/site.ts`. Course metadata lives in `content/courses/*/course.json`, including journey CTA copy. The shared availability rule creates overview routes and clickable journey cards for courses in development; upcoming courses remain metadata-only. Modules and lessons reference stable IDs and sort by authored order within their parent; duplicate sibling positions fail validation. Lesson JSON orders blocks, narrative blocks reference adjacent Markdown, and quiz blocks reference structured activity JSON. Adding a valid lesson file creates its route through `src/pages/cursos/[courseId]/lecciones/[lessonSlug].astro`.

`npm run test:e2e:production` builds internal fixtures into `.astro/fixture-dist` and runs the same browser suite against production output. It does not include fixtures in the public `dist/` build. Route tests also build an isolated copy to verify content-only course availability changes, second-lesson publishing and build failure for invalid ordering.

The fixture is not final curriculum. Canonical curriculum and rubrics remain in `docs`. There is no learner persistence, progress, authentication or backend functionality. Architecture decisions are documented in `docs/90_technical/decisions`.

Deploy `dist/` using a static host supporting directory index files for clean URLs. No hosting provider is configured. The portrait remains unchanged at `public/images/nosotros.jpg`. Marketing styles are scoped so full-screen sections do not affect the continuous lesson reader.
