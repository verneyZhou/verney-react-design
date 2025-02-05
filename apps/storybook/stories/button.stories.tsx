import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@verney/ui';

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        children: { control: 'text' },
        type: {
            control: { type: 'select' },
            options: ['primary', 'default', 'dashed', 'text', 'link']
        },
        size: {
            control: { type: 'select' },
            options: ['large', 'middle', 'small']
        },
        disabled: { control: 'boolean' }
    }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        type: 'primary',
        children: '主要按钮'
    }
};

// ... 其他 stories
