/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        // React 插件支持
        react(),
        // TypeScript 声明文件生成插件
        dts({
            include: ['src'],
            exclude: ['src/**/*.test.tsx', 'src/**/*.stories.tsx'],
            rollupTypes: true,
        }),
    ],
    // 测试配置
    test: {
        globals: true, // 启用全局测试
        environment: 'jsdom', // 使用 jsdom 环境
        setupFiles: ['./src/test/setup.ts'], // 测试启动文件
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], // 测试文件匹配模式
        coverage: {
            reporter: ['text', 'json', 'html'], // 覆盖率报告格式
            exclude: ['node_modules/', 'src/test/setup.ts'], // 排除的文件
        },
    },
    // 构建配置
    build: {
        target: 'modules', // 构建目标
        outDir: 'dist', // 输出目录
        minify: true, // 启用代码压缩
        // 库模式配置
        lib: {
            entry: resolve(__dirname, 'src/index.tsx'), // 入口文件
            name: 'verneyReactDesign', // 库名称
            formats: ['es', 'cjs', 'umd', 'iife'], // 输出格式
            fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`, // 文件名格式
        },
        // Rollup 配置项
        rollupOptions: {
            external: ['react', 'react-dom'], // 外部依赖
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
        sourcemap: true, // 生成 sourcemap
        cssCodeSplit: true, // 启用 CSS 代码分割
    },
});
