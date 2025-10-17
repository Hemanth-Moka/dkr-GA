import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // base: '/jenkinsfrontendapi/', 
  // for dockerpose Comment this lin
  plugins: [react()],
})
