import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ReactFormBuilder',
      fileName: 'react-form-builder'
    },
    rollupOptions: {
      // Ensure to treat react and react-dom as external, since this is a library
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})