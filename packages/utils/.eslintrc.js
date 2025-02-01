module.exports = {
    extends: ['@verney/eslint-config/react'],
    parserOptions: {
        project: './tsconfig.json',
    },
    ignorePatterns: ['.eslintrc.js'],
};
