import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@verney/ui';

const meta = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['large', 'middle', 'small'],
        },
        disabled: { control: 'boolean' },
        placeholder: { control: 'text' },
        status: {
            control: { type: 'select' },
            options: ['error', 'warning', undefined],
        },
        allowClear: { control: 'boolean' },
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: '请输入内容',
    },
};

// ... 其他 stories
