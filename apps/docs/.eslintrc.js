module.exports = {
    extends: [
        '@verney/eslint-config/react',
        'prettier',
        'plugin:prettier/recommended',
    ],
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    parserOptions: {
        // project: './tsconfig.json',
        extraFileExtensions: ['.mdx'],
        tsconfigRootDir: __dirname,
    },
    settings: {
        'mdx/code-blocks': true,
        react: {
            version: 'detect',
        },
    },
    rules: {
        'import/no-unresolved': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'react/jsx-no-undef': 'off',
        'no-useless-escape': 'off',
        'prettier/prettier': 'off',
    },
    overrides: [
        {
            files: ['*.mdx'],
            extends: ['plugin:mdx/recommended'],
            rules: {
                'react/jsx-no-undef': 'off',
            },
        },
    ],
};
