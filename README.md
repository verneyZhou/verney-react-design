# Turborepo + pnpm 搭建 React 组件库

-   [verney-react-design](https://github.com/verneyZhou/verney-react-design)
-   [docs](https://verney-react-design.vercel.app/)
-   [storybook](https://verney-react-design-storybook.vercel.app)

## 项目介绍

本项目是一个基于 Turborepo 和 pnpm 构建的 React 组件库开发框架，采用 monorepo 的方式管理代码。主要包含以下功能：

-   基于 React + TypeScript 的 UI 组件库
-   使用 Nextra 搭建的组件文档站点
-   基于 Storybook 的组件开发和测试环境
-   统一的代码规范和格式化配置

> `node >20+`

> `pnpm >= v9.0.0`

```yml
apps:
    - docs/** # 组件文档
    - storybook/** # storybook组件文档
    - playground/** # 组件预览项目
packages:
    - 'ui/**' # 里面会放组件库，工具库等子项目
    - 'hooks/**' # 里面会放hooks库
    - 'utils/**' # 里面会放utils库
    - 'eslint-config/**' # eslint配置
```

## 项目开发

1. 安装依赖

```bash
pnpm install
```

2. 启动开发环境

```bash
# 启动文档站点
pnpm --filter @verney/docs dev

# 启动 Storybook
pnpm --filter @verney/storybook dev

# 构建组件库
pnpm --filter @verney/ui build
```

3. 组件开发流程

-   在 packages/ui/src 下创建组件
-   在 apps/storybook/stories 下添加组件 stories
-   在 apps/docs/pages 下编写组件文档

## 项目发布

1. 构建

```bash
pnpm build
```

2. 发布到 npm

```bash
pnpm publish --access public
```

3. 版本管理

-   遵循 Semantic Versioning 规范
-   使用 changesets 管理版本和更新日志

### Git Hooks 配置

1. 安装依赖

```bash
pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional
```

2. 初始化 Husky

```bash
pnpm husky install
```

3. 配置 Commitlint

```js
// commitlint.config.js
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat', // 新功能
                'fix', // 修复 bug
                'docs', // 文档变更
                'style', // 代码格式
                'refactor', // 重构代码
                'test', // 测试相关
                'chore', // 构建过程或辅助工具的变动
                'revert' // 回退
            ]
        ]
    }
};
```

4. 配置 Lint-staged

```js
// .lintstagedrc.js
module.exports = {
    '*.{js,jsx,ts,tsx}': ['eslint --fix'],
    '*.{css,less,scss,sass}': ['prettier --write'],
    '*.{json,md}': ['prettier --write']
};
```

5. 添加 Git Hooks

```bash
# 添加 commit-msg hook
pnpm husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'

# 添加 pre-commit hook
pnpm husky add .husky/pre-commit 'npx lint-staged'
```

这些配置将确保：

-   提交信息符合 Conventional Commits 规范
-   在提交前自动运行 ESLint 和 Prettier
-   统一团队的代码风格和提交信息格式

## vercel 部署

## TODO

-   docs、storybook 组件库文档 打包自动部署 vercel

    -   Q1: docs 打包时是怎么把 UI 组件的样式打进去的？在哪里配置的？

    -   Q2: storybook 打包时是怎么把 UI 组件的样式打进去的？在哪里配置的？

-   检查 AI 配置，
-   梳理 monorepo 中 eslint 的校验规则：
    -   eslintrc.js 跟 tsconfig.json 的关系
    -   .lintstagedrc.js 干嘛的
-   utils 库：测试、打包
-   虚拟组件：优化、对比
-   完善博客,学习梳理
-   样式隔离原理（dev, prd）
-   组件库按需加载

## 报错记录

-   lint 报错：`TypeError: prettier.resolveConfig.sync is not a function`

    > 原因：prettier 版本过低，升级 prettier 版本即可：`pnpm add -D eslint-plugin-prettier@5.0.0`

-   lint 报错：

```sh
/Users/zhouyuan17/code/baidu-test-code/verney-react-design/packages/ui/postcss.config.js
  0:0  error  Parsing error: ESLint was configured to run on `<tsconfigRootDir>/postcss.config.js` using `parserOptions.project`: /users/zhouyuan17/code/baidu-test-code/verney-react-design/packages/ui/tsconfig.json
However, that TSConfig does not include this file. Either:
- Change ESLint's list of included files to not include this file
- Change that TSConfig to include this file
- Create a new TSConfig that includes this file and include it in your parserOptions.project
```

> 原因：tsconfig.json 中`include`没有包含`postcss.config.js`文件，需要在`tsconfig.json`中添加： `include: ["postcss.config.js"]`；

> 或者如果不想校验该文件，可以在`.eslintrc.js`中添加`ignorePatterns: ['postcss.config.js']`
