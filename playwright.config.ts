import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:4322', channel: 'chrome', trace: 'retain-on-failure' },
  webServer: { command: 'npx astro dev --port 4322 --ignore-lock', url: 'http://127.0.0.1:4322', reuseExistingServer: false },
});
