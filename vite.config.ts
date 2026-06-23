import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'plastfactor-installation-guide';

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? `/${repoName}/` : './',
});
