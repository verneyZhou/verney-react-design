import type { Meta, StoryObj } from '@storybook/react';
import { VirtualList } from '@verney/ui';
import React, { useState } from 'react';

const meta = {
    title: 'Components/VirtualList',
    component: VirtualList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof VirtualList>;

export default meta;
type Story = StoryObj<typeof meta>;

// 生成测试数据
const generateItems = (count: number) =>
    Array.from({ length: count }, (_, i) => ({
        id: i,
        height: Math.floor(Math.random() * 100) + 50,
        backgroundColor: `hsl(${Math.random() * 360}, 70%, 80%)`,
    }));

// 单列列表示例
export const SingleList: Story = {
    name: '单列列表',
    render: () => {
        const [items, setItems] = useState(() => generateItems(1000));
        const [isLoading, setIsLoading] = useState(false);

        const loadMore = () => {
            setIsLoading(true);
            setTimeout(() => {
                const newItems = generateItems(100);
                setItems((prevItems) => [...prevItems, ...newItems]);
                setIsLoading(false);
            }, 1000);
        };

        return (
            <div style={{ width: '800px' }}>
                <VirtualList
                    items={items}
                    height={600}
                    mode="list"
                    estimatedItemHeight={70}
                    onLoadMore={loadMore}
                    isLoading={isLoading}
                    renderItem={(item) => (
                        <div
                            style={{
                                height: item.height,
                                backgroundColor: item.backgroundColor,
                                padding: '16px',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
                        >
                            列表项 {item.id} (高度: {item.height}px)
                        </div>
                    )}
                />
            </div>
        );
    },
};

// 瀑布流布局示例
export const WaterfallLayout: Story = {
    name: '瀑布流布局',
    render: () => {
        const [items, setItems] = useState(() => generateItems(1000));
        const [isLoading, setIsLoading] = useState(false);

        const loadMore = () => {
            setIsLoading(true);
            setTimeout(() => {
                const newItems = generateItems(100);
                setItems((prevItems) => [...prevItems, ...newItems]);
                setIsLoading(false);
            }, 1000);
        };

        return (
            <div style={{ width: '1200px' }}>
                <VirtualList
                    items={items}
                    height={600}
                    columnCount={3}
                    mode="waterfall"
                    estimatedItemHeight={100}
                    onLoadMore={loadMore}
                    isLoading={isLoading}
                    renderItem={(item) => (
                        <div
                            style={{
                                height: item.height,
                                backgroundColor: item.backgroundColor,
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
                        >
                            瀑布流项 {item.id} (高度: {item.height}px)
                        </div>
                    )}
                />
            </div>
        );
    },
};

// 加载更多示例
export const LoadMore: Story = {
    name: '加载更多',
    render: () => {
        const [items, setItems] = useState(() => generateItems(20));
        const [isLoading, setIsLoading] = useState(false);

        const loadMore = () => {
            setIsLoading(true);
            setTimeout(() => {
                const newItems = generateItems(10);
                setItems((prevItems) => [...prevItems, ...newItems]);
                setIsLoading(false);
            }, 1000);
        };

        return (
            <div style={{ width: '600px' }}>
                <VirtualList
                    items={items}
                    height={400}
                    mode="list"
                    estimatedItemHeight={70}
                    onLoadMore={loadMore}
                    isLoading={isLoading}
                    loadMoreThreshold={50}
                    renderItem={(item) => (
                        <div
                            style={{
                                height: item.height,
                                backgroundColor: item.backgroundColor,
                                padding: '16px',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
                        >
                            列表项 {item.id} (高度: {item.height}px)
                            {items.length - 1 === item.id && (
                                <div
                                    style={{
                                        marginTop: '8px',
                                        fontSize: '14px',
                                        color: '#666',
                                    }}
                                >
                                    {isLoading
                                        ? '加载中...'
                                        : '滚动到底部加载更多'}
                                </div>
                            )}
                        </div>
                    )}
                />
            </div>
        );
    },
};
