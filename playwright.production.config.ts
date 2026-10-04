import { defineConfig } from '@playwright/test';
import development from './playwright.config';

export default defineConfig({
  ...development,
  use: { ...development.use, baseURL: 'http://127.0.0.1:4324' },
  webServer: {
    command: 'npx astro build --outDir .astro/fixture-dist && npx astro preview --outDir .astro/fixture-dist --port 4324 --ignore-lock',
    env: { INCLUDE_INTERNAL_FIXTURES: 'true' },
    url: 'http://127.0.0.1:4324', reuseExistingServer: false,
  },
});
