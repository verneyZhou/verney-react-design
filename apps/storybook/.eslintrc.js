module.exports = {
    extends: ['@verney/eslint-config/react'],
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        // storybook 特定的规则覆盖
        'import/no-anonymous-default-export': 'off', // 允许 stories 文件中的默认导出
        '@typescript-eslint/no-explicit-any': 'off', // story 示例中可能需要使用 any
        'react-hooks/rules-of-hooks': 'warn'
    },
    ignorePatterns: ['storybook-static', '.eslintrc.js']
};
