// eslint-disable-next-line no-undef
module.exports = {
    parser: 'vue-eslint-parser',
    // 继承的ESLint配置
    extends: [
        // 继承typescript的配置
        './typescript',
        // 使用vue推荐的规则配置
        'plugin:vue/vue3-essential',
    ],
    plugins: ['vue'],
    // 具体规则配置
    rules: {
        'vue/html-self-closing': [
            'warn',
            {
                html: {
                    void: 'any',
                    normal: 'any',
                    component: 'any',
                },
            },
        ],
        'vue/script-indent': ['error', 4, { baseIndent: 0, switchCase: 1 }],
        'vue/multi-word-component-names': 'off',
    },
};
