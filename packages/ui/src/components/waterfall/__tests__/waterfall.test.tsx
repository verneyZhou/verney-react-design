import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Waterfall } from '../waterfall';

describe('Waterfall 组件', () => {
    // 基础渲染测试
    it('应该正确渲染 Waterfall 组件及其内容', async () => {
        const items = [
            { id: 1, content: 'Item 1' },
            { id: 2, content: 'Item 2' },
            { id: 3, content: 'Item 3' },
        ];

        render(
            <Waterfall
                dataSource={items}
                columns={2}
                renderItem={(item) => <div>{item.content}</div>}
            />
        );

        // 等待所有项目渲染完成
        await new Promise((resolve) => setTimeout(resolve, 500));

        // 验证所有项目是否都被渲染
        items.forEach((item) => {
            expect(screen.getByText(item.content)).toBeInTheDocument();
        });

        // 验证列数是否正确
        const columns = document.querySelectorAll('.verney-waterfall-column');
        expect(columns).toHaveLength(2);
    });

    // 布局配置测试
    it('应该正确应用列数和间距配置', async () => {
        const items = [
            { id: 1, content: 'Item 1' },
            { id: 2, content: 'Item 2' },
        ];

        const { container } = render(
            <Waterfall
                dataSource={items}
                columns={3}
                gutter={20}
                renderItem={(item) => <div>{item.content}</div>}
            />
        );

        // 等待组件渲染完成
        await new Promise((resolve) => setTimeout(resolve, 500));

        const waterfall = container.querySelector('.verney-waterfall');
        expect(waterfall).toHaveStyle({
            display: 'grid',
            gap: '20px',
            gridTemplateColumns: 'repeat(3, 1fr)',
        });
    });

    // 加载更多功能测试
    it('应该正确处理加载更多功能', async () => {
        const onLoadMore = vi.fn();
        const items = [{ id: 1, content: 'Item 1' }];

        render(
            <Waterfall
                dataSource={items}
                columns={2}
                hasMore={true}
                loading={false}
                onLoadMore={onLoadMore}
                renderItem={(item) => <div>{item.content}</div>}
            />
        );

        // 模拟滚动到底部
        const loader = document.querySelector('.verney-waterfall-loader');
        expect(loader).toBeInTheDocument();

        // 验证加载状态显示
        const { rerender } = render(
            <Waterfall
                dataSource={items}
                columns={2}
                hasMore={true}
                loading={true}
                onLoadMore={onLoadMore}
                renderItem={(item) => <div>{item.content}</div>}
                loadingComponent={<div>Loading...</div>}
            />
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        // 验证没有更多数据状态
        rerender(
            <Waterfall
                dataSource={items}
                columns={2}
                hasMore={false}
                loading={false}
                onLoadMore={onLoadMore}
                renderItem={(item) => <div>{item.content}</div>}
                noMoreComponent={<div>No more data</div>}
            />
        );

        expect(screen.getByText('No more data')).toBeInTheDocument();
    });

    // 动画效果测试
    it('应该正确应用动画配置', async () => {
        const items = [{ id: 1, content: 'Item 1' }];

        const { container } = render(
            <Waterfall
                dataSource={items}
                columns={2}
                enableAnimation={true}
                animationDuration={500}
                animationEasing="ease-in-out"
                renderItem={(item) => <div>{item.content}</div>}
            />
        );

        // 等待组件渲染和动画初始化
        await new Promise((resolve) => setTimeout(resolve, 500));

        const waterfallItem = container.querySelector('.verney-waterfall-item');
        expect(waterfallItem).toHaveStyle({
            transition: expect.stringContaining('500ms ease-in-out'),
        });
        expect(waterfallItem).toHaveStyle({
            opacity: '0',
        });

        // 等待动画完成
        await new Promise((resolve) => setTimeout(resolve, 600));

        expect(waterfallItem).toHaveStyle({
            opacity: '1',
            transform: 'none',
        });
    });

    // 自定义渲染测试
    it('应该正确使用自定义渲染函数', async () => {
        const items = [
            { id: 1, title: 'Custom Title', desc: 'Custom Description' },
        ];

        render(
            <Waterfall
                dataSource={items}
                columns={2}
                renderItem={(item) => (
                    <div className="custom-item">
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                    </div>
                )}
            />
        );

        // 等待组件渲染完成
        await new Promise((resolve) => setTimeout(resolve, 500));

        expect(screen.getByText('Custom Title')).toBeInTheDocument();
        expect(screen.getByText('Custom Description')).toBeInTheDocument();
    });

    // 错误处理测试
    it('应该优雅处理空数据源', async () => {
        const { container } = render(
            <Waterfall
                dataSource={[]}
                columns={2}
                renderItem={(item) => <div>{item.content}</div>}
            />
        );

        // 等待组件渲染完成
        await new Promise((resolve) => setTimeout(resolve, 500));

        const waterfall = container.querySelector('.verney-waterfall');
        expect(waterfall).toBeInTheDocument();
        expect(waterfall?.children).toHaveLength(3); // 2列 + 加载更多容器
    });
});
