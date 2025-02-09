// eslint-disable-next-line no-undef
module.exports = {
    parser: '@babel/eslint-parser',
    // 解析器配置，用于指定如何解析代码。这里使用的是 @babel/eslint-parser 插件，它支持最新的 JavaScript 标准和语法特性。
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        requireConfigFile: false,
    },
    // 指定环境
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    plugins: [
        '@babel',
    ],

    // 具体规则配置
    rules: {
        // 基础规则
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-debugger': 'warn',
        'no-unused-vars': 'warn',
        'no-empty': 'warn',
        
        // 代码风格
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        'indent': ['error', 2],
        'comma-dangle': ['error', 'always-multiline'],
    },
    ignorePatterns: ['dist', 'node_modules'],
};
