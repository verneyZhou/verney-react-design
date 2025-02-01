import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../button';

describe('Button 组件', () => {
    // 基础渲染测试
    it('应该正确渲染按钮及其内容', () => {
        render(<Button>测试按钮</Button>);
        expect(screen.getByText('测试按钮')).toBeInTheDocument();
    });

    // 按钮类型测试
    it('应该正确应用不同的按钮类型样式', () => {
        const types = ['primary', 'default', 'dashed', 'link', 'text'] as const;
        const { rerender } = render(<Button>按钮</Button>);

        types.forEach((type) => {
            rerender(<Button type={type}>按钮</Button>);
            expect(screen.getByText('按钮')).toHaveClass(`verney-btn-${type}`);
        });
    });

    // 尺寸测试
    it('应该正确应用不同的尺寸样式', () => {
        const sizes = ['large', 'middle', 'small'] as const;
        const { rerender } = render(<Button>按钮</Button>);

        sizes.forEach((size) => {
            rerender(<Button size={size}>按钮</Button>);
            if (size !== 'middle') {
                // middle 是默认值，不会添加额外的类名
                expect(screen.getByText('按钮')).toHaveClass(
                    `verney-btn-${size}`
                );
            }
        });
    });

    // 形状测试
    it('应该正确应用不同的形状样式', () => {
        const shapes = ['circle', 'round'] as const;
        const { rerender } = render(<Button>按钮</Button>);

        shapes.forEach((shape) => {
            rerender(<Button shape={shape}>按钮</Button>);
            expect(screen.getByText('按钮')).toHaveClass(`verney-btn-${shape}`);
        });
    });

    // 加载状态测试
    it('应该正确处理加载状态', () => {
        const { container } = render(<Button loading>加载中</Button>);

        const button = screen.getByText('加载中').closest('button');
        expect(button).toHaveClass('verney-btn-loading');
        expect(button).toBeDisabled();
        expect(
            container.querySelector('.verney-btn-loading-icon')
        ).toBeInTheDocument();
    });

    // 禁用状态测试
    it('应该正确处理禁用状态', () => {
        render(<Button disabled>禁用按钮</Button>);
        const button = screen.getByText('禁用按钮');

        expect(button).toHaveClass('verney-btn-disabled');
        expect(button).toBeDisabled();
    });

    // 危险按钮测试
    it('应该正确应用危险按钮样式', () => {
        render(<Button danger>危险按钮</Button>);
        expect(screen.getByText('危险按钮')).toHaveClass('verney-btn-danger');
    });

    // 块级按钮测试
    it('应该正确应用块级按钮样式', () => {
        render(<Button block>块级按钮</Button>);
        expect(screen.getByText('块级按钮')).toHaveClass('verney-btn-block');
    });

    // 图标按钮测试
    it('应该正确渲染带图标的按钮', () => {
        const IconMock = () => <span data-testid="test-icon">图标</span>;
        render(<Button icon={<IconMock />}>图标按钮</Button>);

        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
        expect(screen.getByText('图标按钮')).toBeInTheDocument();
    });

    // HTML类型测试
    it('应该正确设置HTML按钮类型', () => {
        const types = ['submit', 'button', 'reset'] as const;
        const { rerender } = render(<Button>按钮</Button>);

        types.forEach((type) => {
            rerender(<Button htmlType={type}>按钮</Button>);
            expect(screen.getByText('按钮')).toHaveAttribute('type', type);
        });
    });

    // 点击事件测试
    it('应该正确处理点击事件', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>可点击按钮</Button>);

        fireEvent.click(screen.getByText('可点击按钮'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    // 禁用状态下的点击事件测试
    it('在禁用状态下不应触发点击事件', () => {
        const handleClick = vi.fn();
        render(
            <Button disabled onClick={handleClick}>
                禁用按钮
            </Button>
        );

        fireEvent.click(screen.getByText('禁用按钮'));
        expect(handleClick).not.toHaveBeenCalled();
    });

    // 加载状态下的点击事件测试
    it('在加载状态下不应触发点击事件', () => {
        const handleClick = vi.fn();
        render(
            <Button loading onClick={handleClick}>
                加载中按钮
            </Button>
        );

        fireEvent.click(screen.getByText('加载中按钮'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});
