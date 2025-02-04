// 导入 Storybook 必要的类型定义
import type { Meta, StoryObj } from '@storybook/react';
// 导入 Button 组件
import { Button } from '@verney/ui';

// 定义 Button 组件的 meta 配置
const meta = {
    // 在 Storybook 侧边栏中的显示路径
    title: 'Components/Button',
    // 要展示的组件
    component: Button,
    // 组件展示参数
    parameters: {
        // 居中布局
        layout: 'centered',
    },
    // 启用自动文档生成
    tags: ['autodocs'],
    // 控制面板中可调整的参数
    argTypes: {
        // 按钮文本内容
        children: { control: 'text' },
        // 按钮类型选择
        type: {
            control: { type: 'select' },
            options: ['primary', 'default', 'dashed', 'text', 'link'],
        },
        // 按钮尺寸选择
        size: {
            control: { type: 'select' },
            options: ['large', 'middle', 'small'],
        },
        // 是否禁用按钮
        disabled: { control: 'boolean' },
    },
} satisfies Meta<typeof Button>;

// 导出 meta 配置
export default meta;
// 定义 Story 类型
type Story = StoryObj<typeof meta>;

// 导出主要按钮的 Story
export const Primary: Story = {
    args: {
        // 设置按钮类型为主要按钮
        type: 'primary',
        // 设置按钮文本
        children: '主要按钮',
    },
};

// ... 其他 stories
