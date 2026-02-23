import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //port: 3000,
    open: true,
  },
  // include trailing slash so Vite appends paths correctly when the base URL changes
  base: "/SpencerELewis/"
})
