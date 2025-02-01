# Turborepo + pnpm 搭建 React 组件库

## 项目介绍

本项目是一个基于 Turborepo 和 pnpm 构建的 React 组件库开发框架，采用 monorepo 的方式管理代码。主要包含以下功能：

- 基于 React + TypeScript 的 UI 组件库
- 使用 Nextra 搭建的组件文档站点
- 基于 Storybook 的组件开发和测试环境
- 统一的代码规范和格式化配置

## 项目结构

```
.
├── apps/                      # 应用目录
│   ├── docs/                  # 文档站点
│   │   ├── pages/            # 文档页面
│   │   └── theme.config.tsx  # Nextra 主题配置
│   └── storybook/            # Storybook 配置
│       ├── .storybook/       # Storybook 配置文件
│       └── stories/          # 组件 stories
├── packages/                  # 包目录
│   ├── eslint-config/        # ESLint 配置
│   ├── ui/                   # UI 组件库
│   │   ├── src/             # 组件源码
│   │   └── dist/            # 构建产物
│   └── utils/                # 工具函数
├── pnpm-workspace.yaml       # 工作空间配置
└── turbo.json                # Turborepo 配置
```

## 项目搭建

### ui 组件库

1. 初始化项目

```bash
pnpm init
pnpm add -D typescript @types/react @types/react-dom
pnpm add react react-dom
```

2. 配置 TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ESNext",
    "lib": ["DOM", "ESNext"],
    "jsx": "react-jsx",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

3. 配置构建工具 (Vite)

```bash
pnpm add -D vite @vitejs/plugin-react
```

### docs 组件库文档

1. 创建 Next.js 项目

```bash
pnpm create next-app --typescript
```

2. 安装 Nextra

```bash
pnpm add nextra nextra-theme-docs
```

3. 配置 next.config.js

```js
const withNextra = require("nextra")({ theme: "nextra-theme-docs" });
module.exports = withNextra();
```

### storybook 组件库文档

1. 初始化 Storybook

```bash
pnpm dlx storybook@latest init
```

2. 配置 .storybook/main.ts

```ts
const config = {
  stories: ["../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: "@storybook/react-vite",
};
export default config;
```

### eslint 代码规范

1. 安装依赖

```bash
pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

2. 配置 .eslintrc.js

```js
module.exports = {
  extends: ["@verney/eslint-config/react"],
};
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

- 在 packages/ui/src 下创建组件
- 在 apps/storybook/stories 下添加组件 stories
- 在 apps/docs/pages 下编写组件文档

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

- 遵循 Semantic Versioning 规范
- 使用 changesets 管理版本和更新日志

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
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // 修复 bug
        "docs", // 文档变更
        "style", // 代码格式
        "refactor", // 重构代码
        "test", // 测试相关
        "chore", // 构建过程或辅助工具的变动
        "revert", // 回退
      ],
    ],
  },
};
```

4. 配置 Lint-staged

```js
// .lintstagedrc.js
module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix"],
  "*.{css,less,scss,sass}": ["prettier --write"],
  "*.{json,md}": ["prettier --write"],
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

- 提交信息符合 Conventional Commits 规范
- 在提交前自动运行 ESLint 和 Prettier
- 统一团队的代码风格和提交信息格式

## TODO

- docs、storybook 组件库文档 打包自动部署vercel
- 检查AI配置，
- 梳理monorepo中eslint的校验规则：
  - eslintrc.js跟tsconfig.json的关系
  - .lintstagedrc.js干嘛的
- utils 库：测试、打包
- 虚拟组件：优化、对比
- 完善博客,学习梳理

## 报错记录

- lint报错：`TypeError: prettier.resolveConfig.sync is not a function`

  > 原因：prettier版本过低，升级prettier版本即可：`pnpm add -D eslint-plugin-prettier@5.0.0`

- lint报错：

```sh
/Users/zhouyuan17/code/baidu-test-code/verney-react-design/packages/ui/postcss.config.js
  0:0  error  Parsing error: ESLint was configured to run on `<tsconfigRootDir>/postcss.config.js` using `parserOptions.project`: /users/zhouyuan17/code/baidu-test-code/verney-react-design/packages/ui/tsconfig.json
However, that TSConfig does not include this file. Either:
- Change ESLint's list of included files to not include this file
- Change that TSConfig to include this file
- Create a new TSConfig that includes this file and include it in your parserOptions.project
```

> 原因：tsconfig.json中`include`没有包含postcss.config.js文件，需要在tsconfig.json中添加postcss.config.js文件
