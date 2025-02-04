module.exports = {
    extends: ['@verney/eslint-config/react'],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'import/no-unresolved': 'off'
    },
    ignorePatterns: ['dist', '.eslintrc.js'],
};
