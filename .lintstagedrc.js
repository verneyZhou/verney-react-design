module.exports = {
    '*.{js,jsx,ts,tsx}': ['eslint --fix'],
    // 'packages/ui/**/*.{css,less,scss,sass}': ['stylelint --fix', 'prettier --write'],
    '*.{css,less,scss,sass}': ['prettier --write'],
    '*.{json,md}': ['prettier --write'],
};
