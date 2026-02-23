import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    //port: 3000,
    open: true,
  },
  // During local development we don’t want a base path (avoids URL issues),
  // but for production builds we need the GitHub Pages subpath. The placeholder
  // %BASE_URL% in index.html will also use this value when building.
  base: mode === 'production' ? '/SpencerELewis/' : '/'
}))