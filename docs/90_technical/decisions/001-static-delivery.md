# Static-first Astro delivery with React lessons

Status: Accepted and implemented in Phase 0.

The marketing prototype generated four HTML pages with handwritten Node scripts. Interactive lessons need content-generated routes, typed components and browser module packaging.

Astro now owns static routes, layouts, assets and the build. Marketing remains HTML and CSS without React hydration. React is loaded only for a lesson experience. The existing URLs, copy and design are preserved.

Production requires a static host supporting directory index routes. No application server, database or account service is introduced. The development-only fixture is excluded from normal production builds. `INCLUDE_INTERNAL_FIXTURES=true` explicitly includes it in a preview build; that output must not replace a public production build.

The accepted cost is framework tooling and a bounded page migration. Next.js, a separate SPA and continued custom route generation were not selected because Phase 0 does not require server-owned learner features.
