import { defineConfig } from 'tsup';

export default defineConfig({
    external: ['react'], //
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: true,
});
