// eslint-disable-next-line no-undef
module.exports = {
    // 指定 TypeScript 的 ESLint 解析器
    parser: '@typescript-eslint/parser',
    // 继承的 ESLint 配置
    extends: [
        // ESLint 推荐规则
        'eslint:recommended',
        // TypeScript ESLint 推荐规则
        'plugin:@typescript-eslint/recommended',
        // import 插件错误检查规则
        'plugin:import/errors',
        // import 插件警告规则
        'plugin:import/warnings',
        // import 插件 TypeScript 支持
        'plugin:import/typescript',
        // prettier 覆盖 eslint 本身规则
        // 添加 prettier 插件、设置 prettier 规则、关闭所有可能与 prettier 冲突的 ESLint 规则
        'plugin:prettier/recommended'
    ],
    plugins: [
        '@typescript-eslint',
        'import'
        // 'prettier'
    ],
    // 自定义规则配置
    rules: {
        // 关闭要求导出函数和类的公共类方法必须显式声明返回值和参数类型的规则
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        // 警告使用 any 类型的情况
        '@typescript-eslint/no-explicit-any': 'warn',
        // import 语句排序规则
        'import/order': [
            'error',
            {
                // import 分组顺序
                groups: [
                    'builtin', // 内置模块
                    'external', // 外部模块
                    'internal', // 内部模块
                    'parent', // 父级目录模块
                    'sibling', // 同级目录模块
                    'index' // index 文件
                ],
                // 分组之间是否需要空行
                'newlines-between': 'always',
                // 按字母顺序排序配置
                alphabetize: {
                    order: 'asc', // 升序排列
                    caseInsensitive: true // 忽略大小写
                }
            }
        ],
        'prettier/prettier': 'off' // 关闭 prettier 所有规则
    }
};
