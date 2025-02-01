/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ['src'],
            exclude: ['src/**/*.test.tsx', 'src/**/*.stories.tsx'],
            rollupTypes: true,
        }),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        coverage: {
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', 'src/test/setup.ts'],
        },
    },
    build: {
        target: 'modules',
        //输出文件目录
        outDir: 'dist',
        //压缩
        minify: true,
        lib: {
            entry: resolve(__dirname, 'src/index.tsx'),
            name: 'verneyReactDesign',
            formats: ['es', 'cjs', 'umd', 'iife'], // 支持umd、cjs、esm三种格式
            fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                // entryFileNames: '[name].js',
                // chunkFileNames: '[name]-[hash].js',
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
        sourcemap: true,
        cssCodeSplit: true,
        css: {
            // 确保 CSS 文件被提取到单独的文件中
            extract: true,
        },
        cssCodeSplit: true,
    },
});
