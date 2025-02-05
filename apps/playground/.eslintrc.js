module.exports = {
    extends: ['@verney/eslint-config/react'],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'import/no-unresolved': 'off',
    },
    ignorePatterns: ['dist', '.eslintrc.js'],
};