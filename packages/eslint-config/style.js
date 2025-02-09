// eslint-disable-next-line no-undef
module.exports = {
    extends: [
        'stylelint-config-standard',
        // 'stylelint-config-standard-scss',
        // 'stylelint-config-prettier',
    ],
    rules: {
        // // 自定义规则
        'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'extend', 'content', 'include'] }],
        // indentation: 4,
        'no-descending-specificity': null, // 禁止特异性较低的选择器在特异性较高的选择器之后重写
    },
    overrides: [
        {
            files: ['*.scss', '**/*.scss'],
            customSyntax: 'postcss-scss',
        },
        {
            files: ['*.less', '**/*.less'],
            customSyntax: 'postcss-less',
        },
    ],
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
};
