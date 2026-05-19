import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Troque 'treino-exclusive' pelo nome EXATO do seu repositório no GitHub
export default defineConfig({
  plugins: [react()],
  base: '/treino-exclusive/',
})
