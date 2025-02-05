module.exports = {
    extends: ['@verney/eslint-config/react'],
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    rules: {
        'import/order': 'off',
        'no-undef': 'off', // 允许在 TypeScript 中使用全局变量
    },
    ignorePatterns: ['.eslintrc.js', 'dist'],
};
