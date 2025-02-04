// eslint-disable-next-line no-undef
module.exports = {
    // 继承的ESLint配置
    extends: [
        // 继承typescript的配置
        './typescript',
        // 使用React推荐的规则配置
        'plugin:react/recommended',
        // 使用React Hooks推荐的规则配置
        'plugin:react-hooks/recommended',
        // 使用JSX可访问性推荐的规则配置
        'plugin:jsx-a11y/recommended',
    ],
    // React相关设置
    settings: {
        react: {
            // 自动检测React版本
            version: 'detect',
        },
    },
    // 具体规则配置
    rules: {
        // 关闭强制在JSX文件中引入React的规则
        'react/react-in-jsx-scope': 'off',
        // 关闭组件props类型检查规则
        'react/prop-types': 'off',
        // 关闭组件display-name规则
        'react/display-name': 'off',
        // Hooks规则错误级别设置为error
        'react-hooks/rules-of-hooks': 'error',
        // Hooks依赖检查规则设置为warning
        'react-hooks/exhaustive-deps': 'warn',
    },
};
