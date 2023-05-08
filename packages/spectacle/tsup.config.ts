import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  outDir: './lib',
  clean: false,
  external: ['react', 'react-dom'],
  dts: true,
  format: ['cjs', 'esm'],
  target: 'es6'
});
