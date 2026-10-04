import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  integrations: [react()],
  devToolbar: { enabled: false },
  server: { host: '127.0.0.1', port: 3000 },
});
