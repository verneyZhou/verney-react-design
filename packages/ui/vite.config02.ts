/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { peerDependencies, dependencies } from './package.json';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    plugins: [
        // React 插件支持
        react(),
        // TypeScript 声明文件生成插件, 生成声明文件 (.d.ts)
        dts({
            include: ['src'],
            exclude: ['src/**/*.test.tsx', 'src/**/*.stories.tsx', '**/_virtual/**'],
            // insertTypesEntry: true, // 是否插入类型入口
            // copyDtsFiles: true,     // 拷贝文件时是否包含类型
            // rollupTypes: true, // 打包类型声明文件
            outDir: 'dist/types', // 输出目录
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
        minify: false, // 启用代码压缩, 不混淆代码（组件库通常需要可读性）
        // 库模式配置
        lib: {
            entry: resolve(__dirname, 'src/index.tsx'), // 入口文件
            name: 'verneyReactDesign', // 库名称
            formats: ['es', 'cjs', 'umd', 'iife'], // 输出格式
            fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`, // 文件名格式
        },
        rollupOptions: {
            input: resolve(__dirname, 'src/index.tsx'),
            output: [
                {
                    format: 'es',
                    dir: resolve(__dirname, './dist/es'), // 输出到 ES 文件夹
                    // entryFileNames: '[name].mjs', // .mjs 文件是 ES module 标准格式
                    // chunkFileNames: '[name]-[hash].mjs', // ES 模块的 chunk 文件
                    entryFileNames: (chunkInfo) => {
                        // 过滤掉 _virtual 和 node_modules
                        if (
                            chunkInfo.name.includes('_virtual') ||
                            chunkInfo.name.includes('node_modules')
                        ) {
                            return 'skip/[name].mjs'; // 放入 skip 目录，打包完后再删除
                        }
                        return '[name].mjs';
                    },
                    chunkFileNames: (chunkInfo) => {
                        console.log('====chunkInfo', chunkInfo);
                        if (
                            chunkInfo.name.includes('_virtual') ||
                            chunkInfo.name.includes('node_modules')
                        ) {
                            return 'skip/[name]-[hash].mjs';
                        }
                        return '[name]-[hash].mjs';
                    },
                    assetFileNames: '[name].[ext]', // 统一输出样式
                    // assetFileNames: ({ name }) =>
                    //     name?.endsWith('.css') ? 'styles/[name]' : '[name].[ext]', // 样式文件单独存储到 styles
                    exports: 'named',
                    preserveModules: true, // 保留模块目录结构
                    preserveModulesRoot: 'src', // 自定义模块根目录
                    paths: (id) => {
                        if (id.startsWith('node_modules')) {
                            return id.replace('node_modules/', '');
                        }
                        return id;
                    },
                },
                {
                    format: 'cjs',
                    dir: resolve(__dirname, './dist/lib'), // 输出到 CJS 文件夹
                    // entryFileNames: '[name].js', // .js 文件是 CommonJS 标准格式
                    // chunkFileNames: '[name]-[hash].js', // CJS 模块的 chunk 文件
                    entryFileNames: (chunkInfo) => {
                        // 过滤掉 _virtual 和 node_modules
                        if (
                            chunkInfo.name.includes('_virtual') ||
                            chunkInfo.name.includes('node_modules')
                        ) {
                            return 'skip/[name].mjs'; // 放入 skip 目录，打包完后再删除
                        }
                        return '[name].mjs';
                    },
                    chunkFileNames: (chunkInfo) => {
                        console.log('====chunkInfo', chunkInfo);
                        if (
                            chunkInfo.name.includes('_virtual') ||
                            chunkInfo.name.includes('node_modules')
                        ) {
                            return 'skip/[name]-[hash].mjs';
                        }
                        return '[name]-[hash].mjs';
                    },
                    assetFileNames: '[name].[ext]', // 统一输出样式
                    exports: 'named',
                    preserveModules: true, // 保留模块目录结构
                    preserveModulesRoot: 'src', // 自定义模块根目录
                },
            ],
            // 外部化 React 和其他 peerDependencies
            external: [
                ...Object.keys(peerDependencies || {}), // 确保 peerDependencies 不会被打包到组件库中
                ...Object.keys(dependencies || {}), // 如果你希望更小的文件体积，可以移除 dependencies
                'react',
                'react-dom',
            ],
        },
        sourcemap: true, // 生成 sourcemap
        cssCodeSplit: true, // 启用 CSS 代码分割
    },
});
