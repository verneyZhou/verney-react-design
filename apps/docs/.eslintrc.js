// ESLint 配置文件
module.exports = {
    // 继承 verney react eslint 配置
    extends: ['@verney/eslint-config/react'],

    // 运行环境配置
    env: {
        node: true, // 启用 Node.js 环境
        browser: true, // 启用浏览器环境
        es6: true // 启用 ES6+ 特性
    },

    // 解析器选项
    parserOptions: {
        // project: './tsconfig.json', // TypeScript 配置文件路径
        extraFileExtensions: ['.mdx'], // 额外支持的文件扩展名
        tsconfigRootDir: __dirname // TypeScript 配置根目录
    },

    // 特定设置
    settings: {
        'mdx/code-blocks': true, // 启用 MDX 代码块支持
        // 配置 import 解析
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json'
            },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx', '.mjs', '.md'],
                moduleDirectory: ['node_modules', '../../packages']
                // paths: ['../../packages/ui/src']
            }
        },
        // 添加以下配置
        // 'import/parsers': {
        //     '@typescript-eslint/parser': ['.ts', '.tsx', '.mdx']
        // },
        react: {
            version: 'detect' // 自动检测 React 版本
        }
    },

    // ESLint 规则配置
    rules: {
        'import/no-unresolved': 'off', // 关闭模块导入检查
        'mdx/no-unescaped-entities': 'off', // 关闭 MDX 实体转义检查
        '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any 类型
        '@typescript-eslint/no-var-requires': 'off', // 允许使用 require 语句
        'react/jsx-no-undef': 'off', // 关闭 JSX 未定义变量检查
        'no-useless-escape': 'off', // 关闭不必要的转义检查
        'prettier/prettier': 'off' // 关闭 prettier 格式化规则
    },

    // 特定文件覆盖配置
    overrides: [
        {
            files: ['*.mdx'], // 针对 MDX 文件
            extends: ['plugin:mdx/recommended'], // 使用推荐的 MDX 配置
            rules: {
                'import/namespace': 'off', // 添加此规则
                'react/jsx-no-undef': 'off', // 关闭 JSX 未定义变量检查
                'prettier/prettier': 'warn'
            }
        }
    ]
};
