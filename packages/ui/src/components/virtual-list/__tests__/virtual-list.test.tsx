import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VirtualList } from '../virtual-list';

describe('VirtualList 组件', () => {
    // 基础渲染测试
    it('应该正确渲染虚拟列表及其内容', () => {
        const data = [
            { id: 1, text: '测试项1' },
            { id: 2, text: '测试项2' },
        ];
        render(
            <VirtualList
                data={data}
                uniqueKey="id"
                renderItem={(item) => <div>{item.text}</div>}
                visibleHeight={200}
            />,
        );

        expect(screen.getByText('测试项1')).toBeInTheDocument();
        expect(screen.getByText('测试项2')).toBeInTheDocument();
    });

    // 空数据测试
    it('应该正确处理空数据情况', () => {
        render(<VirtualList data={[]} renderItem={() => null} visibleHeight={200} />);

        const wrapper = screen.getByRole('group');
        expect(wrapper).toBeInTheDocument();
        expect(wrapper.children.length).toBe(1); // 只有translate容器
    });

    // 加载更多功能测试
    it('应该正确处理加载更多功能', async () => {
        const onLoadMore = vi.fn().mockResolvedValue(undefined);
        const { container } = render(
            <VirtualList
                data={[{ id: 1, text: '测试项1' }]}
                uniqueKey="id"
                renderItem={(item) => <div>{item.text}</div>}
                visibleHeight={200}
                hasMore={true}
                onLoadMore={onLoadMore}
            />,
        );

        const loadMoreText = container.querySelector('.verney-virtual-loadmore__text');
        expect(loadMoreText).toHaveTextContent('加载更多');
    });

    // 自定义加载更多渲染测试
    it('应该正确处理自定义加载更多渲染', () => {
        const customLoadMoreText = '点击加载更多数据';
        render(
            <VirtualList
                data={[{ id: 1, text: '测试项1' }]}
                uniqueKey="id"
                renderItem={(item) => <div>{item.text}</div>}
                visibleHeight={200}
                hasMore={true}
                renderLoadMore={(loading, hasMore) => (
                    <div>{loading ? '加载中' : hasMore ? customLoadMoreText : '没有更多'}</div>
                )}
            />,
        );

        expect(screen.getByText(customLoadMoreText)).toBeInTheDocument();
    });

    // 页面模式测试
    it('应该正确处理页面模式', () => {
        render(
            <VirtualList
                data={[{ id: 1, text: '测试项1' }]}
                uniqueKey="id"
                renderItem={(item) => <div>{item.text}</div>}
                pageMode={true}
            />,
        );

        const wrapper = screen.getByRole('group').parentElement;
        expect(wrapper).toHaveStyle({
            height: 'auto',
            overflow: 'visible',
        });
    });

    // 滚动事件测试
    it('应该正确触发滚动事件', () => {
        const onScroll = vi.fn();
        const { container } = render(
            <VirtualList
                data={[{ id: 1, text: '测试项1' }]}
                uniqueKey="id"
                renderItem={(item) => <div>{item.text}</div>}
                visibleHeight={200}
                onScroll={onScroll}
            />,
        );

        const wrapper = container.querySelector('.verney-virtual-list__wrapper');
        fireEvent.scroll(wrapper);

        expect(onScroll).toHaveBeenCalled();
    });

    // 滚动到顶部回调测试
    it('应该正确触发滚动到顶部回调', () => {
        const onScrollTop = vi.fn();
        const { container } = render(
            <VirtualList
                data={[{ id: 1, text: '测试项1' }]}
                uniqueKey="id"
                renderItem={(item) => <div>{item.text}</div>}
                visibleHeight={200}
                onScrollTop={onScrollTop}
                topThreshold={10}
            />,
        );

        const wrapper = container.querySelector('.verney-virtual-list__wrapper');
        act(() => {
            // 模拟滚动到顶部
            Object.defineProperty(wrapper, 'scrollTop', { value: 0 });
            fireEvent.scroll(wrapper);
        });

        expect(onScrollTop).toHaveBeenCalled();
    });

    // 样式类名测试
    it('应该正确应用自定义样式类名', () => {
        const customClass = 'custom-wrapper';
        const customItemClass = 'custom-item';
        render(
            <VirtualList
                data={[{ id: 1, text: '测试项1' }]}
                uniqueKey="id"
                renderItem={(item) => <div>{item.text}</div>}
                visibleHeight={200}
                wrapperClass={customClass}
                itemWrapperClass={customItemClass}
            />,
        );

        expect(screen.getByRole('group').parentElement).toHaveClass(customClass);
    });
});
