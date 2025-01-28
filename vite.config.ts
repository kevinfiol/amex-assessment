import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    minify: false,
    outDir: 'dist',
    lib: {
      name: 'amex-assessment',
      formats: ['es'],
      entry: {
        index: './src/index.ts',
        Modal: './src/Modal.tsx'
      },
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime'
      ],
      output: {
        entryFileNames: '[name].js',
        preserveModules: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup-tests.ts']
  }
});
