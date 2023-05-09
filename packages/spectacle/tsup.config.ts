import { defineConfig } from 'tsup';
import externalGlobal from 'esbuild-plugin-external-global';

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  outDir: './lib',
  clean: false,
  external: ['react', 'react-dom'],
  dts: true,
  format: ['cjs', 'esm', 'iife'],
  skipNodeModulesBundle: true,
  globalName: 'Spectacle',
  target: 'es6',

  /**
   * Couple build options for UMD/iife build.
   *  - externalGlobalPlugin to use window.React instead of trying to bundle it.
   *  - for iife build, set platform to "browser" and define process.env.NODE_ENV
   */
  esbuildPlugins: [
    externalGlobal.externalGlobalPlugin({
      react: 'window.React',
      'react-dom': 'window.ReactDOM'
    })
  ],

  esbuildOptions: (options, context) => {
    if (context.format === 'iife') {
      options.minify = true;
      options.platform = 'browser';
      options.define!['process.env.NODE_ENV'] = '"production"';
    }
  }
});
