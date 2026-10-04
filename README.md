# Invest Smarter with AI visual MVP

Dependency-free static HTML and CSS, rendered by small JavaScript components. Requires Node.js 22 or later. No install step is needed.

Run `npm run dev` and open http://localhost:3000. The preview builds once at startup; restart it after edits.

Run `npm run lint`, `npm test`, and `npm run build` to validate and generate `dist/`. The lint command checks JavaScript syntax with Node. There is no TypeScript configuration.

Routes: `/`, `/programa`, `/nosotros`, `/cursos/000`. The course route is an explicit development placeholder, without lesson content or enrollment. The Certified milestone is a visual destination; certificate issuance is not implemented. The provided portrait is stored at `public/images/nosotros.jpg` and copied into the build.

Brand settings live in `src/config/site.mjs`. The six course records live in `src/features/courses/courses.mjs`; titles follow `docs/01_curriculum/` and Spanish descriptions are visual MVP presentation copy. Update that one data file if canonical titles change.

Deploy `dist/` using a static host that supports directory index files for clean URLs. No hosting or deployment is configured in this iteration.
