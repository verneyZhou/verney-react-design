import { defineConfig } from 'tsup';

export default defineConfig({
    // 入口文件
    entry: ['src/index.ts'],
    // 生成类型文件
    dts: true,
    // 生成 sourcemap
    sourcemap: true,
    // 代码压缩
    minify: true,
    // 输出格式
    format: ['cjs', 'esm'],
    // 清理输出目录
    clean: true,
});
