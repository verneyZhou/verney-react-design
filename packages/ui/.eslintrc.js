module.exports = {
    extends: ['@verney/eslint-config/react'],
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    rules: {
        'import/order': 'off',
    },
    ignorePatterns: ['.eslintrc.js', 'dist'],
};
