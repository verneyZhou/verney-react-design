# Verney Design Storybook

这是 Verney Design 组件库的 Storybook 配置包，用于组件开发、测试和文档展示。

## 目录结构

```
apps/storybook/
├── .storybook/ # Storybook 配置目录
│ ├── main.ts # 主配置文件
│ └── preview.ts # 预览配置文件
├── stories/ # 组件 stories 目录
│ ├── button/
│ │ └── button.stories.tsx
│ └── input/
│ └── input.stories.tsx
├── package.json
└── README.md
```

## 添加新组件 Story

1. 在 `stories` 目录下创建新的组件目录
2. 创建 `[component-name].stories.tsx` 文件
3. 使用以下模板：

```ts
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "@verney/ui";
const meta = {
  title: "Components/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // 定义组件参数类型
  },
} satisfies Meta<typeof ComponentName>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    // 定义默认参数
  },
};
```

## 配置说明

### main.ts

- 配置 stories 文件位置
- 配置插件
- 配置构建工具
- 配置其他 Storybook 选项

### preview.ts

- 配置全局样式
- 配置预览参数
- 配置控件行为
- 配置其他预览选项

## 使用的插件

- @storybook/addon-essentials：核心插件集
- @storybook/addon-interactions：交互测试
- @storybook/addon-links：故事链接
- @storybook/addon-a11y：可访问性检查
- @storybook/addon-onboarding：新手引导

## 开发建议

1. 为每个组件创建独立的 stories 文件
2. 使用 argTypes 定义参数控制器
3. 添加足够的使用示例
4. 使用 autodocs 标签生成文档
5. 添加组件说明和使用注意事项

## 注意事项

1. 确保 @verney/ui 包已经构建
2. 修改组件后需要重启 Storybook
3. 构建前检查依赖关系
4. 注意样式文件的引入顺序

## 常见问题

### 样式不生效

检查 preview.ts 中的样式引入是否正确：
