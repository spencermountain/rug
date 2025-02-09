import { rollup } from 'rollup';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import terser from '@rollup/plugin-terser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

async function build() {
  const bundle = await rollup({
    input: 'src/index.js',
    plugins: [
      terser()
    ]
  });

  await bundle.write({
    file: 'builds/index.js',
    format: 'umd',
    name: 'parseRug',
    sourcemap: true
  });

  await bundle.close();

  console.log('✨ Build complete!');
}

build().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
}); 