const { build } = require('esbuild');

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  sourcemap: true,
  minify: true,
  format: 'esm',
  target: ['esnext'],
  external: ['react', 'react-dom']
}).catch(() => process.exit(1));