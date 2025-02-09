# @verney/eslint-config 使用说明

@verney/eslint-config 是一个统一的 ESLint 配置包，支持多种项目类型的代码规范配置。

## ESLint 插件和解析器说明

| 插件/解析器                        | 类型   | 作用                                                                | 使用场景                            |
| ---------------------------------- | ------ | ------------------------------------------------------------------- | ----------------------------------- |
| `babel-eslint`<br>(已废弃)         | 解析器 | - 支持最新的 ES 语法<br>- 支持 Flow 类型注解<br>- 支持 JSX          | 已被 @babel/eslint-parser 替代      |
| `@babel/eslint-parser`             | 解析器 | - 解析现代 JavaScript 语法<br>- 支持实验性语法<br>- 支持 Babel 配置 | 使用 Babel 且需要 ESLint 支持的项目 |
| `eslint-plugin-babel`<br>(已废弃)  | 插件   | - 提供一些特定的 Babel 语法规则                                     | 已被 @babel/eslint-plugin 替代      |
| `@babel/eslint-plugin`             | 插件   | - 支持 Babel 特定语法规则<br>- 提供实验性特性的规则                 | 配合 @babel/eslint-parser 使用      |
| `@typescript-eslint/parser`        | 解析器 | - 解析 TypeScript 代码<br>- 生成 AST<br>- 支持类型检查              | TypeScript 项目                     |
| `@typescript-eslint/eslint-plugin` | 插件   | - TypeScript 特定的 lint 规则<br>- 类型检查规则<br>- 最佳实践规则   | TypeScript 项目的代码质量控制       |
| `eslint-plugin-import`             | 插件   | - 检查导入/导出语法<br>- 路径解析<br>- 导入顺序规则                 | 模块化 JavaScript/TypeScript 项目   |
| `eslint-plugin-react`              | 插件   | - React 语法规则<br>- JSX 规则<br>- React 最佳实践                  | React 项目                          |
| `eslint-plugin-react-hooks`        | 插件   | - Hooks 规则检查<br>- Hooks 依赖检查<br>- Hooks 使用规范            | 使用 React Hooks 的项目             |
| `eslint-plugin-vue`                | 插件   | - Vue 语法规则<br>- 模板语法检查<br>- Vue 最佳实践                  | Vue 项目                            |

### 常见组合

1. **传统 JavaScript 项目**

```json
{
    "parser": "@babel/eslint-parser",
    "plugins": ["@babel", "import"]
}
```

1. **React + TypeScript 项目**

```json
{
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint", "react", "react-hooks", "import"]
}
```

2. **\*Vue + TypeScript 项目**

```json
{
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "parser": "@typescript-eslint/parser"
    },
    "plugins": ["vue", "@typescript-eslint", "import"]
}
```

`peerDependencies`

> 对等依赖是指与你的包一起安装的其他包，但这些依赖不会由你的包直接安装。它们需要由最终用户（即安装你包的人）在其项目中`显式安装`。这种方法常用于插件或工具库，它们需要与特定版本的另一个包一起工作，但不希望或不需要控制那个包的安装。

`peerDependenciesMeta`

> peerDependenciesMeta 是一个较新的字段，用于提供关于 peerDependencies 的额外元数据。它为每个对等依赖项指定了一个 optional 属性，值为 true。这意味着虽然这些依赖被声明为对等依赖，但它们实际上是可选的。如果最终用户没有安装这些可选的依赖，你的包应该能够优雅地处理这种情况，而不是直接失败。这种机制特别有用于插件或工具，它们可能提供多个可选功能，每个功能依赖于不同的对等包。通过这种方式，最终用户可以根据需要安装特定的对等依赖，而不会被迫安装他们不需要的额外包。

参考项目：[@ecomfe/eslint-config](https://www.npmjs.com/package/@ecomfe/eslint-config)

## 使用说明

### JavaScript 项目

1. 安装依赖：

```bash
pnpm add -D eslint @verney/eslint-config
```

2. 在项目根目录创建 `.eslintrc.js`：

```js
module.exports = {
    extends: ['@verney/eslint-config/base'],
};
```

### TypeScript 项目

1. 安装依赖：

```bash
pnpm add -D eslint typescript @verney/eslint-config
```

2. 在项目根目录创建 `.eslintrc.js`：

```js
module.exports = {
    extends: ['@verney/eslint-config/typescript'],
};
```

### TypeScript + React 项目

1. 安装依赖：

```bash
pnpm add -D eslint typescript @verney/eslint-config eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

2. 在项目根目录创建 `.eslintrc.js`：

```js
module.exports = {
    extends: ['@verney/eslint-config/react'],
};
```

### TypeScript + Vue 项目

1. 安装依赖：

```bash
pnpm add -D eslint typescript @verney/eslint-config eslint-plugin-vue
```

2. 在项目根目录创建 `.eslintrc.js`：

```js
module.exports = {
    extends: ['@verney/eslint-config/vue'],
};
```

## 样式规范配置

如果需要添加样式规范检查（支持 CSS/SCSS），可以按照以下步骤配置：

1. 安装依赖：

```bash
pnpm add -D stylelint stylelint-config-standard stylelint-config-standard-scss stylelint-config-prettier postcss-scss
```

2. 在项目根目录创建 `stylelint.config.js`：

```js
module.exports = {
    extends: ['@verney/eslint-config/style'],
};
```

## 可选插件配置

根据项目需求，可以选择性安装以下插件：

### Prettier 集成

为了确保代码格式化的一致性，建议安装 Prettier 相关插件：

```bash
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
```

### Import 插件

如果需要对导入语句进行规范检查：

```bash
pnpm add -D eslint-plugin-import
```

## 注意事项

1. 所有配置都已经包含了必要的 parser 和 plugin 配置，一般情况下不需要额外的设置。
2. 如果项目中使用了特殊的文件类型或语法，可能需要在 `.eslintrc.js` 中添加额外的配置。
3. 建议在项目的 `package.json` 中添加 lint 相关的 npm scripts：

```json
{
    "scripts": {
        "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
        "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix"
    }
}
```

## 版本要求

-   Node.js >= 14.0.0
-   ESLint >= 8.0.0
-   TypeScript >= 4.7.0（如果使用 TypeScript）
-   Prettier >= 2.8.0（如果使用 Prettier）
